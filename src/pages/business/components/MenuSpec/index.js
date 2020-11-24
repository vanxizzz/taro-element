import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import "./index.scss"
// import imgSrc from "@/assets/imgs/big/lg5.jpg"
import MyTagGroup from "@/components/common/MyTagGroup"
import MyFloatLayout from "@/components/common/MyFloatLayout"
import NumCalc from "@/components/common/NumCalc"
export default class index extends Component {
    static defaultProps = {
        show: false,
        data: {
            businessId: "",
            menuId: "",
            img: "",
            name: "",
            originPrice: "",
            discount: "",
            specs: [],
        },
        onMaskClick() { },
        onBuyBtnClick() { }
    }
    constructor(props) {
        super(props);
        this.state = {
            curNum: 1,
            curSpecs: [],
        }
    }
    /* props变化时，state变回初始状态 */
    componentWillReceiveProps(newProps) {
        this.setState(prevState => {
            return {
                ...prevState,
                curNum: 1,
                curSpecs: [],
            }
        })
    }
    /* 点击加入购物车按钮触发的事件 */
    onBuyBtnClick(e) {
        e.stopPropagation();
        const { curNum, curSpecs } = this.state
        const { specs = [], img: menuImg, name: menuName, ...dataInfo } = this.props.data;
        if (curSpecs.length !== specs.length || curNum === 0) {
            /* 有些规格没选择 */
            let toastTitle;
            if (curNum === 0) {
                toastTitle = "请选择数量！";
            } else {
                const needChangeSpecs = specs.filter(item => {
                    return !curSpecs.find(it => it.type === item.type);
                }).map(item => item.type).join("、");
                toastTitle = "请选择规格：" + needChangeSpecs;
            }
            Taro.showToast({
                title: toastTitle,
                icon: "none",
                duration: 1000
            })
            return;
        }

        // const { num=1,businessId, menuId, menuName, menuImg, discount, originPrice, specs = [] } = payload;
        const info = {
            ...dataInfo,
            num: curNum,
            specs: curSpecs,
            menuImg,
            menuName,
        }
        this.props.onBuyBtnClick(info);
    }
    /* 改变当前数量 */
    changeCurNum({ type, newNum }) {
        this.setState(prevState => {
            return {
                ...prevState,
                curNum: newNum
            }
        })
    }
    getSpecsItem(specsItem) {
        return specsItem.map((item, i) => {
            return {
                ...item,
                text: item.detail,
            }
        })
    }
    changeCurSpecItem({ value }) {
        let targetSpecIndex = this.state.curSpecs.findIndex(item => item.type === value.type);
        let newCurSpecs;
        if (targetSpecIndex === -1) {
            // 没有
            newCurSpecs = [...this.state.curSpecs, { type: value.type, item: [{ text: value.detail, price: value.price }] }]
        } else {
            newCurSpecs = this.state.curSpecs.map((it, i) => {
                if (targetSpecIndex !== i) {
                    return { ...it }
                }
                return {
                    ...it,
                    item: [{ text: value.detail, price: value.price }]
                }
            })
        }
        this.setState(prevState => {
            return {
                ...prevState,
                curSpecs: newCurSpecs
            }
        })
        // {
        //     type: "辣度",
        //     item: [
        //         {
        //             text: "中辣",
        //             price: 1
        //         },
        //         {
        //             text: "贼辣",
        //             price: 2
        //         },
        //     ]
        // }
    }
    getSpecWrapperComp() {
        const { specs = [], menuId } = this.props.data;
        return <View className="specWrapper">
            {specs.map((specsInfo) => {
                return (
                    <View key={menuId} className="specItem">
                        <View className="specTitle">{specsInfo.type}</View>
                        <View className="specValueWrapper">

                            <MyTagGroup
                                show={this.props.show}
                                wrapperStyle={{
                                    flexWrap: "wrap"
                                }}
                                style={{
                                    flexGrow: 0,
                                    padding: "20rpx 60rpx"
                                }}
                                mode="radio"
                                data={this.getSpecsItem(specsInfo.item)}
                                onClick={(obj) => {
                                    this.changeCurSpecItem(obj)
                                }}
                            />

                        </View>
                    </View>

                )
            })}

        </View>
    }
    getCurSpecsComp() {
        return this.state.curSpecs.map(it => {
            let str = "";
            it.item.forEach(temp => str += temp.text);
            return (
                <Text key={it.type} className="spec">{str}</Text>
            )
        })
    }
    getPrice(type = "nowPrice") {
        const { originPrice = 0, discount = 1 } = this.props.data;
        const { curSpecs = [], curNum } = this.state
        let resultPrice = 0;
        curSpecs.forEach(specs => {
            specs.item.forEach(item => {
                resultPrice += item.price;
            });
        })
        if (type === "nowPrice") {
            resultPrice += originPrice;
            resultPrice *= discount;
        } else if (type === "originPrice") {
            resultPrice += originPrice;
        }
        return Number(resultPrice).toFixed(2);
    }
    getMenuInfoComp() {
        const { img, name } = this.props.data;
        return (
            <View className="menuInfo">
                <View className="imageWrapper">
                    <Image src={img} className="img" />
                </View>
                <View className="info">
                    <View className="title">
                        {name}
                    </View>
                    <View className="selectedSpec">
                        <Text>已选：</Text>
                        {this.getCurSpecsComp()}
                        {/* <Text className="spec">榴莲味</Text>
                        <Text className="spec">18寸</Text> */}
                    </View>
                    <View className="money">
                        <View className="nowPrice">￥{this.getPrice("nowPrice")}</View>
                        <View className="originPrice">￥{this.getPrice("originPrice")}</View>
                    </View>
                </View>

            </View>

        )
    }
    getNumComp() {
        return (
            <View className="num">
                <View className="word">数量</View>
                <View>
                    <NumCalc onChange={(obj) => {
                        this.changeCurNum(obj)
                    }} curNum={this.state.curNum} />
                </View>
            </View>

        )
    }

    render() {
        return (
            <View key={this.props.data.menuId} className="menuSpec">
                <MyFloatLayout
                    onMaskClick={this.props.onMaskClick}
                    show={this.props.show}
                    viewHeight={800}
                    bottomHeight={100}
                    renderChildren={() => {
                        return (
                            <View className="menuSpecWrapper">
                                {this.getMenuInfoComp()}
                                {this.getNumComp()}
                                {this.getSpecWrapperComp()}
                            </View>
                        )
                    }}
                    renderBottom={() => {
                        return <View onClick={this.onBuyBtnClick} className="addCartBtn">加入购物车</View>
                    }}
                />


            </View>
        )
    }
}
