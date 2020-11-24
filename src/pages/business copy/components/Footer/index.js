import Taro, { Component } from '@tarojs/taro'
import "./index.scss"
import { AtTabBar } from 'taro-ui'
import MyIcon from "@/components/common/MyIcon"
import Context from "../../businessContext"
import MyFloatLayout from "@/components/common/MyFloatLayout"
import { Block } from '@tarojs/components'
import NumCalc from "@/components/common/NumCalc"
import { calcItem } from "@/utils/calcPrice"
export default class index extends Component {
    static contextType = Context
    /**
     * 返回："pay"可以支付，"noMust"没有选中必须品，"noLowestPrice"不足最低起送价
     */
    getBtnStatus() {
        const res = {};
        let { curCart = {}, lowestPrice } = this.context.curBusiness ? this.context.curBusiness : {};
        if (curCart.nowTotalPrice >= lowestPrice) {
            /* 超过最低起送价 */
            if (1) {
                /* 该条件得判断有没有选中必需品，还未开发 */
                res.pay = true;
            } else {
                res.noMust = true;
            }
        } else {
            res.noLowestPrice = true
        }
        return res;
    }
    // state = {
    //     show: false
    // }
    changeShowState(status) {
        this.context.updateCartModal && this.context.updateCartModal(status);
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         show: status
        //     }
        // })
    }
    getCurSpecsComp(item) {
        return item.specs.map(it => {
            let str = "";
            it.item.forEach(temp => str += temp.text);
            return (
                <Text key={it.type} className="spec">{str}</Text>
            )
        })
    }
    async changeCurNum({ type, newNum }, it) {
        try {
            const content = `确定${type === "increase" ? "添加" : "减少"}${it.menuName}吗`;
            const { confirm } = await Taro.showModal({ content })
            if (confirm) {
                this.context[type + "Order"]({ ...it, num: 1 });
                // if (type === "increase") {
                //     this.context.increaseOrder()
                // }
            }
        } catch (error) {
        }

    }
    /* type：showModal或hideModal，代表出现是否阴影时的Footer */
    getAccountBtn() {
        const { lowestPrice = 0, businessId } = this.context.curBusiness;
        const status = this.getBtnStatus();
        let text;
        let handleClick;
        if (status.pay) {
            text = "去结算";
            handleClick = () => {
                Taro.redirectTo({
                    url: `/pages/confirmOrder/index?businessId=${businessId}`
                })
                console.log("结算咯~~~")
            }
        } else if (status.noLowestPrice) {
            text = `￥${lowestPrice}元起送`
        } else if (status.noMust) {
            text = "未选中必选品"
        }

        return <View className="rightBtn" onClick={(e) => {
            e.stopPropagation();
            console.log("this.context.userIdiiiiiiiiiiiiiiii")
            console.log(this.context.userId)
            if (this.context.userId == null) {
                Taro.navigateTo({
                    url: "/pages/login/index"
                });
                return;
            }
            handleClick && handleClick();
        }}>
            <View className="wrapper">
                <View className="lowestPrice">
                    {text}
                </View>
                {/* hadSelectMust是已经选了必选品 */}
                {/* <View className="mustSelect hadSelectMust" >未点必选品</View> */}
            </View>
        </View>
    }
    getFooterComp(type) {
        // let { curCart = {}, lowestPrice = 0, deliverFee = 0 } = this.context.curBusiness;
        let { curCart = { nowTotalPrice: 0, originTotalPrice: 0 }, lowestPrice = 0, deliverFee = 0 } = this.context.curBusiness ? this.context.curBusiness : {};
        const { footer } = this.context.height ? this.context.height : {};
        return <Block>
            <View
                onClick={() => {
                    if (curCart.menuNum > 0) {
                        this.changeShowState(!this.context.showCartModal)
                    }
                }}
                className={`bottomWrapper ${curCart.menuNum > 0 ? "hadOrder" : "nonOrder"}`} //nonOrder是购物车为空，相反是hadOrder
                style={{
                    height: footer,
                    backgroundColor: `${type === "showModal" ? "#fff" : "#fff"}`
                }}

            >
                <View className="left">
                    <AtTabBar
                        iconSize={47}
                        tabList={[
                            {
                                title: "",
                                iconPrefixClass: "_global_iconfont",
                                iconType: "ruleIcon",
                                text: curCart.menuNum
                            }]}
                    />
                    {/* <MyIcon color={0 ? "#999" : "#02B6FD"} value="boxIcon" size={47} /> */}
                    <View className="moneyWrapper">
                        <View className="curMoney">
                            <Text className="nowPrice">￥{Number(curCart.nowTotalPrice).toFixed(2)}</Text>
                            <Text className="originPrice">{Number(curCart.originTotalPrice).toFixed(2)}</Text>
                        </View>
                        <View className="deliverFee">
                            另需配送费￥{deliverFee}
                        </View>
                    </View>
                </View>
                {this.getAccountBtn()}
                {/* <View className="rightBtn">
                    <View className="wrapper">
                        {this.getAccountBtn()}
                    </View>
                </View> */}
            </View>
        </Block>
    }
    getPrice(item) {
        /* 计算公式：原价+specs价 */
        // let res = item.originPrice;
        // item.specs.forEach(it => {
        //     it.item.forEach(specsItem => {
        //         res += specsItem.price;
        //     })
        // })
        // console.log("测试7：", calcItem(item).originPrice / item.num)
        // console.log("测试8：", Number(res).toFixed(2))
        // return Number(res).toFixed(2);
        return calcItem(item).originPrice / item.num
    }
    /* 清空所有菜单 */
    clearCart() {
        const { businessId } = this.context.curBusiness;
        this.context.clearCart(businessId);
    }
    getMenuItemList() {
        let { curCart: { orderMenu = [] } = {} } = this.context.curBusiness ? this.context.curBusiness : {};
        return <View className="menuItemListWrapper" style={{

            bottom: this.context.height.footer
        }}>
            <View className="title">
                <View className="left">
                    已选商品
                </View>
                <View className="right" onClick={this.clearCart}>
                    <MyIcon value="rubbishIcon" color="#ccc" />
                    <Text>清空</Text>
                </View>
            </View>
            <View className="itemWrapper">
                {orderMenu.map(item => {
                    return <View key={item.menuId} className="item">
                        <View className="imageWrapper">
                            <Image src={item.menuImg} className="img" />
                        </View>
                        <View className="info">
                            <View className="title">
                                {item.menuName}
                            </View>
                            <View className="selectedSpec">
                                <Text>已选：</Text>
                                {this.getCurSpecsComp(item)}
                            </View>
                            <View className="money">
                                <View className="originPrice">￥{this.getPrice(item)}</View>
                                <View className="num">
                                    <NumCalc onChange={(obj) => {
                                        this.changeCurNum(obj, item)
                                    }} curNum={item.num} />
                                </View>
                            </View>

                        </View>
                    </View>

                })}
            </View>

        </View>
    }
    render() {
        const { showCartModal: show } = this.context
        return (
            <Block>
                {show
                    ?
                    <MyFloatLayout
                        onMaskClick={() => {
                            this.changeShowState(false)
                        }}
                        mainInfoStyle={{
                            height: "initial",
                        }}
                        show={show}
                        haveScroll={false}
                        renderChildren={() => {
                            return <Block>
                                {this.getMenuItemList()}
                            </Block>
                        }}
                        bottomHeight={parseFloat(this.context.height.footer)}
                        renderBottom={() => {
                            return <Block>{this.getFooterComp("showModal")}</Block>
                        }}

                    />
                    :
                    <Block>{this.getFooterComp("hideModal")}</Block>
                }



            </Block>
        )
    }
}
