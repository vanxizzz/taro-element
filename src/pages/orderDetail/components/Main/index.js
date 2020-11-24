import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Block, Map, Image } from '@tarojs/components'
import './index.scss'
import MyIcon from "@/components/common/MyIcon"

import { connect } from "@tarojs/redux"
import { selectOrderById, updateOrderById } from "@/apis/front/order"
import InfoComp from "../InfoComp"
import moment from "moment"
import deepClone from "@/utils/deepClone"
import { calcCart, calcItem } from "@/utils/calcPrice"

class index extends PureComponent {
    static defaultProps = {
        theOrderId: null,
    }
    // lastPage = null
    constructor(props) {
        super(props);
    }

    state = {
        orderDetail: null,
        mapMarkers: [],
        leaveTime: 0
    }
    async componentDidMount() {
        // return;
        console.log("this.props.iddddddddddd")
        console.log(this.props.theOrderId)
        const newOrderDetail = await this.getOrderDetailById(+this.props.theOrderId);
        if (!newOrderDetail) {
            return;
        }
        const { businessInfo } = newOrderDetail.info;
        const newMapMarkers = [
            {
                id: 0,
                latitude: businessInfo.location.latitude,
                longitude: businessInfo.location.longitude,
                // title: businessInfo.name,
                callout: {
                    content: businessInfo.name,
                    color: "#f40",
                    fontSize: "24",
                    borderRadius: "5",
                    borderWidth: "1",
                    borderColor: "#929292",
                    padding: "3",
                    display: "ALWAYS",
                    textAlign: "center",
                },
                iconPath: businessInfo.logoSrc,
                width: 30,
                height: 30,
            }
        ]
        console.log(moment().diff(newOrderDetail.expireTime, "s"))
        console.log("剩余时间")
        this.setState(prevState => {
            return {
                ...prevState,
                orderDetail: newOrderDetail,
                mapMarkers: newMapMarkers,
                leaveTime: Math.abs(moment().diff(newOrderDetail.expireTime, "s"))
            }
        })
        if (newOrderDetail.isPaid === false) {
            this.timer = setInterval(() => {
                if (this.state.leaveTime <= 1) {
                    clearInterval(this.timer);
                    return;
                }
                this.setState(prevState => {
                    return {
                        ...prevState,
                        leaveTime: prevState.leaveTime - 1
                    }
                })
            }, 1000);
        }
    }
    /* 清楚定时器 */
    async componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    /* 65秒 -> 1分5秒 */
    getLeaveTime(leaveTime) {
        if (!leaveTime) {
            leaveTime = this.state.leaveTime;
        }
        let minute = Math.floor(leaveTime / 60);
        let second = leaveTime - minute * 60;
        if (second < 10) {
            second = "0" + second;
        }
        return `${minute}分${second}秒`
    }
    /* 根据id获取orderDetail */
    async getOrderDetailById(id) {
        let res = {};
        if (id == null) {
            return null;
        }
        res = await selectOrderById(id);
        console.log("鑫鑫鑫鑫鑫鑫鑫鑫鑫鑫")
        console.log(res);
        console.log(id);
        return { ...res }
    }
    /* 获取specs字符串，如：特辣、多饭 */
    getSpecs(specs = []) {
        let str = "";
        specs.forEach(item => {
            item.item.forEach(specsItem => {
                str += specsItem.text + "、"
            })
        })
        str = str.replace(/、$/, "");
        return str;
    }
    /* 获取每个食品的价格，计算公式： */
    getPrice(item) {
        let num = item.num ? item.num : 1;
        // let resultPrice = item.originPrice;
        // item.specs.forEach(specsItem => {
        //     specsItem.item.forEach(({ price }) => {
        //         resultPrice += price;
        //     })
        // })
        // resultPrice = resultPrice * item.discount;
        // resultPrice = Number(resultPrice).toFixed(2);
        // console.log("测试11：", resultPrice)
        // console.log("测试12：", calcItem({ ...item, num }).nowPrice / num)
        // return resultPrice;
        return Number(calcItem({ ...item, num }).nowPrice / num).toFixed(2);
    }
    /* 获取实付 */
    getRealPay() {
        if (!this.state.orderDetail) {
            return 0;
        }
        // const { cart, businessInfo } = this.state.orderDetail.info;
        // console.log("测试9：", cart.nowTotalPrice + businessInfo.deliverFee + businessInfo.packFee)
        // console.log("测试10：", calcCart(businessInfo))
        // return cart.nowTotalPrice + businessInfo.deliverFee + businessInfo.packFee;
        console.log("this.state.orderDetail.info")
        console.log(this.state.orderDetail.info)
        return calcCart({
            ...this.state.orderDetail.info.businessInfo,
            curCart: this.state.orderDetail.info.cart
        });
    }
    /* 获取购物车组件 */
    getCartComp() {

        const { info = { businessInfo: {}, cart: {} } } = this.state.orderDetail ? this.state.orderDetail : {};
        const { businessInfo, cart } = info;
        let composeElseOrderMenu = []
        if (cart.orderMenu) {
            composeElseOrderMenu = [
                ...deepClone(cart.orderMenu),
                {
                    menuName: "打包费",
                    discount: 1,
                    originPrice: businessInfo.packFee,
                    num: 1,
                    specs: [],

                },
                {
                    menuName: "配送费",
                    discount: 1,
                    originPrice: businessInfo.deliverFee,
                    specs: [],
                },
            ]
        }
        return (
            <Block>
                {
                    this.state.orderDetail
                    &&
                    <View className="cartWrapper commonWrapperClass">
                        <View className="title" onClick={() => {
                            console.log(businessInfo)
                            Taro.redirectTo({
                                url: `/pages/business/index?id=${businessInfo.businessId}`
                            })
                        }}>
                            <View className="left">
                                <View className="logoWrapper">
                                    <Image className="img" src={businessInfo.logoSrc} />
                                </View>
                                <View className="businessName">{businessInfo.name}</View>
                            </View>
                            <View className="right">
                                <MyIcon value="rightArrowIcon" />
                            </View>
                        </View>
                        <View className="itemWrapper">
                            {composeElseOrderMenu.map(item => {
                                return (
                                    <View key={item.menuName} className="cartItem">
                                        <View className="left">
                                            <View className="itemName">{item.menuName}</View>
                                            <View className="specs">{this.getSpecs(item.specs)}</View>
                                        </View>
                                        <View className="right">
                                            <View className="num">
                                                {item.num ? "x" + item.num : ""}
                                            </View>
                                            <View className="nowPrice">
                                                ￥{this.getPrice(item)}
                                            </View>
                                        </View>
                                    </View>

                                )
                            })}



                            {/* <View className="cartItem">
                                <View className="left">
                                    <View className="itemName">烤鸡</View>
                                    <View className="specs">超辣</View>
                                </View>
                                <View className="right">
                                    <View className="num">
                                        x{3}
                                    </View>
                                    <View className="nowPrice">
                                        ￥{45}
                                    </View>
                                </View>
                            </View> */}

                        </View>
                        <View className="totalPriceWrapper">
                            <View className="concat">
                                <MyIcon value="concatIcon" />
                                <Text className="word">联系商家</Text>
                            </View>
                            <View className="totalPrice">
                                实付 ￥{this.getRealPay()}
                            </View>
                        </View>
                    </View>
                }
            </Block>
        )
    }
    /* 点击去支付触发的事件 */
    async handleUnPay() {
        // if(Taro)
        const { confirm } = await Taro.showModal({ content: "确认支付吗？" });
        if(!confirm){
            return false;
        }
        const data = await updateOrderById({ id: this.props.theOrderId, isPaid: true });
        this.setState(prevState => ({ ...prevState, orderDetail: data }))
        // Taro.redirectTo({
        //     url: "/pages/orderDetail"
        // })
    }
    render() {
        let info = this.state.orderDetail;
        let deliverInfo;
        let orderInfo;
        if (!info) {
            info = {
                businessInfo: {
                    location: {
                        latitude: 0,
                        longitude: 0
                    }
                }
            }
        } else {
            info = info.info;
            const { name, phone, fullName } = this.state.orderDetail.targetAddress;
            const { orderId, createTime } = this.state.orderDetail
            deliverInfo = {
                type: "配送信息",
                data: [
                    {
                        label: "送达时间",
                        value: [moment().add(this.state.orderDetail.info.businessInfo.deliverTime, "hour").format("HH:mm")]
                    },
                    {
                        label: "送货地址",
                        value: [
                            name,
                            phone,
                            fullName
                        ]
                    },
                    {
                        label: "配送方式",
                        value: ["蜂鸟快送"]
                    }
                ]
            }
            orderInfo = {
                type: "订单信息",
                data: [
                    {
                        label: "订单号",
                        value: [orderId]
                    },
                    {
                        label: "支付方式",
                        value: ["在线支付"]
                    },
                    {
                        label: "下单时间",
                        value: [moment(createTime).utc().format("YYYY-MM-DD HH:mm")]
                    }
                ]
            }
        }
        const { location: { latitude, longitude } } = info.businessInfo;
        console.log(latitude, longitude);
        return (
            <View className="orderDetail">
                <Map
                    longitude={longitude}
                    latitude={latitude}
                    className="myMap"
                    id="myMap"
                    markers={this.state.mapMarkers}
                    enableScroll={false}
                />
                <View className="wrapper">
                    {(this.state.orderDetail && !this.state.orderDetail.isPaid)
                        &&
                        <View className="noPay commonWrapperClass">
                            <View className="wait">
                                <Text>等待支付</Text>
                                <MyIcon value="rightArrowIcon" />
                            </View>
                            <View className="quickly">尽快支付</View>
                            <View className="deliverType">蜂鸟快送</View>
                            <View className="btns">
                                <Button plain className="btn btns-cancel">取消订单</Button>
                                <Button plain className="btn btns-toPay" onClick={this.handleUnPay}>去支付（还剩{this.getLeaveTime()}）</Button>
                            </View>
                        </View>
                    }
                    {this.getCartComp()}
                    <InfoComp {...deliverInfo} />
                    <InfoComp {...orderInfo} />

                </View>


            </View>



        );
    }
}
export default index;
