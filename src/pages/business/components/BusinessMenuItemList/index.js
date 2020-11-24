import Taro, { Component } from '@tarojs/taro'
import "./index.scss"
import { ScrollView, View, Text, Image, Button } from "@tarojs/components"
// import { AtTag } from "taro-ui"
import MyIcon from "@/components/common/MyIcon"
// import imgSrc from "@/assets/imgs/big/lg5.jpg"
import MyTagGroup from "@/components/common/MyTagGroup"
import NumCalc from "@/components/common/NumCalc"
import MenuSpec from "../MenuSpec"
import Context from "../../businessContext"
import getParams from "@/utils/getParams"
export default class index extends Component {
    static contextType = Context
    state = {
        showMenuSpec: false,
        menuSpecInfo: {}
    }
    handleNumCalc(obj, it) {
        if (it.specs.length > 0) {
            if (obj.type === "decrease") {
                //减的话，下方弹出购物车
                this.context.updateCartModal && this.context.updateCartModal(true);
            } else {
                this.updateSpecsModal(true, it);
            }
        } else {
            /* 参考models/business里的menuData里的menuItem */
            const { businessId, menuId, name: menuName, img: menuImg, discount, originPrice, specs } = it;
            this.context[obj.type + "Order"]({ businessId, menuId, menuName, menuImg, discount, originPrice, specs });
            // if (obj.type === "increase") {
            //     //添加
            //     this.context.increaseOrder({ businessId, menuId, menuName, menuImg, discount, originPrice, specs })
            // } else if (obj.type === "decrease") {
            //     //减少
            //     this.context.decreaseOrder({ businessId, menuId, menuName, menuImg, discount, originPrice, specs })
            // }
        }
    }
    createMenuItemTag(menuData) {
        if (!menuData) {
            return [];
        }
        if (menuData.discount) {
            return [
                {
                    text: (menuData.discount * 10).toFixed(1) + "折",
                }
            ]
        }
    }
    getCurNum(menuItem) {
        let result = 0;
        if (!this.context.curBusiness.curCart) {
            return result;
        }
        const arr = this.context.curBusiness.curCart.orderMenu.filter(it => it.menuId === menuItem.menuId);
        if (arr.length > 0) {
            arr.forEach(item => {
                result += item.num;
            })
        }

        // debugger;
        return result;
    }
    updateSpecsModal(status, menuItem) {
        if (!menuItem) {
            status = false;
        }
        // const { img, name, originPrice, discount, specs, num } = this.props.data;
        this.setState(prevState => {

            const newMenuSpecInfo = {
                businessId: menuItem.businessId,
                menuId: menuItem.menuId,
                img: menuItem.img,
                name: menuItem.name,
                originPrice: menuItem.originPrice,
                discount: menuItem.discount,
                specs: menuItem.specs,
            };
            return {
                ...prevState,
                showMenuSpec: status,
                menuSpecInfo: newMenuSpecInfo
            }
        })
    }
    render() {
        let curBusiness = this.context.curBusiness
        let menuData;
        if (!curBusiness) {
            menuData = [];
        } else {
            menuData = curBusiness.menuData ? curBusiness.menuData : []
        }
        let paddingTop = 0;
        if (this.context.lastProps.fixedSomeComp) {
            paddingTop = this.context.height.nav;
        }
        console.log("this.context.curTypeeeeeeeeeeeee")
        console.log(this.context.curType)
        return (
            <View className="menuItemList" style={{
                paddingBottom: this.context.height.footer,
                paddingTop,
            }}>
                <MenuSpec
                    onMaskClick={() => {
                        this.setState({
                            ...this.state,
                            showMenuSpec: !this.state.showMenuSpec
                        })
                    }}
                    data={this.state.menuSpecInfo}
                    onBuyBtnClick={(obj) => {
                        this.context.increaseOrder(obj);
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                showMenuSpec: false
                            }
                        });
                        Taro.showToast({
                            title: "添加成功~",
                            duration: 1000
                        })
                        // this.context.forceUpdate();
                    }}
                    show={this.state.showMenuSpec} />
                <ScrollView
                    scrollIntoView={this.context.curType}
                    scrollY
                    style={{
                        width:"100%",
                        height:"100%"
                    }}
                    scrollWithAnimation
                >

                    {menuData.map((item, i) => {
                        return (
                            <View
                                id={`scrollId${i}`}
                                className="menuItemListWrapper"
                                key={item.type.text} >
                                <View className="menuType">
                                    {item.type.icon && <MyIcon {...item.type.icon} className="titleIcon" />}
                                    <Text className="navTitle">{item.type.text}</Text>
                                </View>
                                <View className="menuItemBox">
                                    {item.menuItem.map(it => {
                                        return <View className="menuItem" key={it.menuId}>
                                            <View className="imageBox">
                                                <Image className="image" src={it.img} />
                                            </View>
                                            <View className="info">
                                                <View className="mainInfo">
                                                    <View className="item menuTitle">{it.name}</View>
                                                    <View className="item introduction">{it.shortIntroduction}</View>
                                                    <View className="item sellPerMonth">月售{it.saleNum}份</View>
                                                    <View className="item discount">
                                                        <MyTagGroup
                                                            mode="onlyShow"
                                                            style={{
                                                                borderColor: "#f40",
                                                                color: "#f40",
                                                                flexGrow: "0",
                                                                padding: "0 6rpx"
                                                            }}
                                                            data={this.createMenuItemTag(it)}
                                                        />
                                                    </View>
                                                </View>
                                                <View className="moneyAndNum">
                                                    <View className="left">
                                                        <View className="nowPrice">
                                                            {`￥${(it.originPrice * it.discount).toFixed(2)}`}
                                                        </View>
                                                        <View className="originPrice">
                                                            {`￥${it.originPrice}`}
                                                        </View>
                                                    </View>
                                                    <View className="right">
                                                        {
                                                            this.getCurNum(it) <= 0 && it.specs.length > 0
                                                                ?
                                                                <View onClick={() => {
                                                                    this.updateSpecsModal(true, it)
                                                                }} className="chooseSpec">选规格</View>
                                                                :
                                                                <NumCalc key={it.menuId} onChange={(obj) => {

                                                                    this.handleNumCalc(obj, it);
                                                                }} curNum={this.getCurNum(it)} />

                                                        }
                                                    </View>

                                                </View>
                                            </View>
                                        </View>

                                    })}
                                </View>

                            </View>

                        )
                    })}
                </ScrollView>

            </View>
        )
    }
}
