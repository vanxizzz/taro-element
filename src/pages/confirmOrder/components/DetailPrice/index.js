import Taro, { Component } from '@tarojs/taro'
import MyIcon from "@/components/common/MyIcon"
import { View, Text, Block } from "@tarojs/components"
import "./index.scss"
import imgSrc from "@/assets/imgs/waimai/4.jpg"
import FlexItem from '../../../../components/common/FlexItem'
import Context from "../../context"
import deepClone from "@/utils/deepClone"
import { calcCart, calcItem } from "@/utils/calcPrice"
export default class index extends Component {
    static contextType = Context
    flexItemData = {

        leftStyle: {
            fontWeight: "bold",
            fontSize: "37rpx"
        },
        rightStyle: {
            fontWeight: "bold",
            fontSize: "30rpx",
            color: "#C7C7C7"
        },
        data: [
            {
                name: "packFee",//包装费
                data: [
                    {
                        title: "包装费",
                    },
                    {
                        title: "￥0",
                        style: {
                            color: "#000",
                        }
                    }
                ]
            },
            {
                name: "deliverFee",//配送费
                data: [
                    {
                        title: "配送费",
                    },
                    {
                        title: "￥0",
                        style: {
                            color: "#000",
                        }
                    }
                ]
            },
            {
                name: "redPackage",//红包
                data: [
                    {
                        title: "红包/抵用券",
                        onMyClick: () => {
                            console.log("left1")
                        },
                        renderMyComp: null
                    },
                    {
                        title: "选择地址后使用红包",
                        icon: {
                            value: "redPacketIcon",
                            color: "#fff",
                            size: "18"
                        },
                        iconLocation: "left",
                        onMyClick: () => {
                            console.log("right1")
                        },
                        style: {
                            backgroundColor: "#f40",
                            color: "#fff",
                            padding: "10rpx"
                        }
                    }
                ]
            },
            {
                name: "totalPrice",//总价
                data: [
                    {
                        title: "优惠说明",
                        icon: {//参考MyIcon
                            value: "wenhaoIcon",
                            color: "#C5C5C5",
                            size: "28"
                        },
                        iconLocation: "left",//在文字的左边，可以传left，right
                        style: {
                            color: "#C5C5C5",
                            fontSize: "28rpx"
                        }
                    },
                    {
                        title: "小计￥74",
                        style: {}
                    },
                ],
            },
            {
                name: "remark",//备注
                data: [
                    {
                        title: "订单备注",
                    },
                    {
                        title: "口味、偏好",
                        icon: {
                            value: "rightArrowIcon",
                            color: "#C5C5C5",
                            size: "18"
                        },
                        iconLocation: "right",
                        style: {
                            fontSize: "28rpx",
                            color: "#C5C5C5",

                        }
                    },
                ],
            },
            {
                name: "tableware",//餐具
                data: [
                    {
                        title: "餐具份数",
                    },
                    {
                        title: "依据餐量提供",
                        icon: {
                            value: "rightArrowIcon",
                            color: "#C5C5C5",
                            size: "18"
                        },
                        iconLocation: "right",
                        style: {
                            fontSize: "28rpx",
                            color: "#C5C5C5",

                        }
                    },
                ],
            },
            {
                name: "bill",//发票
                data: [
                    {
                        title: "发票信息",
                    },
                    {
                        title: "该店不支持线上发票，请电话联系商户",
                        style: {
                            fontSize: "28rpx",
                            color: "#C5C5C5",
                        }
                    },
                ],
            }


        ]
    }
    getNewFlexItemData({ flexItemData, name, dataIndex, objInfo = {} }) {
        let newData = flexItemData;
        newData = {
            ...newData,
            data: deepClone(newData.data).map(item => {
                if (item.name !== name) {
                    return { ...item }
                }
                return {
                    ...item,
                    data: deepClone(item.data).map((it, i) => {
                        if (i !== dataIndex) {
                            return { ...it };
                        }
                        return {
                            ...it,
                            ...objInfo
                        }
                    })
                }

            })
        }
        return newData
    }
    /* 获取文本的spec，比如：超辣、多饭 */
    getTypeText(specsArr = []) {
        let text = "";
        specsArr.forEach(item => {
            item.item.forEach(it => {
                text += it.text + "、";
            })
        });
        text = text.replace(/、$/, "");
        return text;
    }
    /* 获取总共价格 */
    getTotalPrice({ deliverFee = 0, packFee = 0, curCart = { nowTotalPrice: 0 } }) {
        return Number(deliverFee + packFee + curCart.nowTotalPrice).toFixed(2);
    }
    getRealOriginPrice(item = { specs: [] }) {
        // let originPrice = item.originPrice;
        // item.specs.forEach(specsItem => {
        //     specsItem.item.forEach(valueItem => {
        //         originPrice += valueItem.price;
        //     })
        // })
        // console.log("测试4：", Number(originPrice).toFixed(2))
        // console.log("测试5：", calcItem(item).originPrice / item.num)
        // return Number(originPrice).toFixed(2);
        return Number(calcItem(item).originPrice / item.num).toFixed(2);
    }
    render() {
        const { curAddress, curBusiness = {} } = this.context ? this.context : {}
        let newData = this.flexItemData;
        /* 有地址了 */
        if (curAddress) {
            console.log("curAddress")
            newData = this.getNewFlexItemData({
                flexItemData: newData, name: "redPackage", dataIndex: 1, objInfo: {
                    title: "5个可用",
                    icon: {
                        value: "redPacketIcon",
                        color: "#f40",
                        size: "18"
                    },
                    iconLocation: "left",
                    onMyClick: () => {
                        console.log("right1")
                    },
                    style: {
                        color: "#000"
                    }
                }
            })
        }
        if (curBusiness.curCart) {
            newData = this.getNewFlexItemData({
                flexItemData: newData,
                name: "totalPrice",
                dataIndex: 1,
                objInfo: {
                    title: `小计${this.getTotalPrice(curBusiness)}`
                }
            })
            /* 处理包装费 */
            newData = this.getNewFlexItemData({
                flexItemData: newData,
                name: "packFee",
                dataIndex: 1,
                objInfo: {
                    title: `￥${curBusiness.packFee}`
                }
            })
            /* 处理配送费 */
            newData = this.getNewFlexItemData({
                flexItemData: newData,
                name: "deliverFee",
                dataIndex: 1,
                objInfo: {
                    title: `￥${curBusiness.deliverFee}`
                }
            })
        }

        console.log("this.contextttttttttttttt")
        console.log(this.context)

        return <Block>
            <View className="detailPrice">
                <View className="title">{curBusiness.name}</View>
                <View className="itemWrapper">
                    {
                        curBusiness.curCart
                        &&
                        curBusiness.curCart.orderMenu.map(item => {
                            return (
                                <View className="item" key={item.menuId}>
                                    <View className="left">
                                        <View className="imageWrapper">
                                            <Image src={item.menuImg} className="img" />
                                        </View>
                                        <View className="info">
                                            <View className="menuName">{item.menuName}</View>
                                            <View className="specs">
                                                {/* 超辣、多饭 */}
                                                {this.getTypeText(item.specs)}
                                            </View>
                                        </View>
                                    </View>
                                    <View className="right">
                                        <View className="numBox">x<Text className="num">{item.num}</Text></View>
                                        <View className="originPrice">￥{this.getRealOriginPrice(item)}</View>
                                    </View>
                                </View>

                            )
                        })
                    }
                    {/* <View className="item">
                        <View className="left">
                            <View className="imageWrapper">
                                <Image src={imgSrc} className="img" />
                            </View>
                            <View className="info">
                                <View className="menuName">秘制~光明乳鸽</View>
                                <View className="specs">
                                    超辣、多饭
                                </View>
                            </View>
                        </View>
                        <View className="right">
                            <View className="numBox">x<Text className="num">{5}</Text></View>
                            <View className="originPrice">￥{45}</View>
                        </View>
                    </View> */}
                </View>
                <Block>
                    {newData.data.map(item => {
                        return <View key={item.name} className="flexItemWrap">

                            <FlexItem
                                data={item.data.map(({ style, ...it }, i) => {
                                    let theStyle = style ? style : (i === 0 ? this.flexItemData.leftStyle : this.flexItemData.rightStyle);
                                    if (!theStyle) {
                                        theStyle = {};
                                    }
                                    return { ...it, style: theStyle }
                                })}
                            />
                        </View>

                    })}
                </Block>
            </View>
        </Block>
    }
}
