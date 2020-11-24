import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, Block } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import "./index.scss"
import Context from "../../context"
import Address from "../Address"
import DetailPrice from "../DetailPrice"
import Layout from "@/components/common/Layout"
import moment from "moment"
import calcDistance from "@/utils/calcDistance"
import { deliverSpeed } from "@/service/apis/constance"
import { addOrder } from "@/apis/front/order"
class index extends PureComponent {
    static contextType = Context
    static defaultProps = {
        addressList: [],//地址列表
        businessList: [],//商家列表
        businessId: null,
        addressId: null,
        router: {
            path: "",
            params: {}
        },
        userLocation: { lng: 0, lat: 0 },
        userId: null,
    }
    constructor(props) {
        super(props);
        console.log("哇大撒大苏打顶顶顶顶顶顶顶顶顶顶顶顶顶")
        this.initState(props);
    }

    /* 初始化state，在constructor调用 */
    initState(props) {
        if (!props.businessId) {
            return;
        }
        const business = props.businessList.find(item => item.businessId === props.businessId);
        console.log(business, props.businessList, props.businessId)
        if (!business) {
            throw "找不到该商家"
        }
        /* 设置配送的时间 */
        const { lat, lng } = this.props.userLocation;
        const distance = calcDistance({ lat, lng }, { lat: business.location.latitude, lng: business.location.longitude });
        const deliverTime = distance / deliverSpeed
        this.state.curBusiness = { ...business, deliverTime };
        this.state.curBusinessId = props.businessId;
        this.state.curAddress = (() => {
            let arr = props.addressList
            if (!arr) {
                arr = []
            }
            let address = arr.find(addressItem => addressItem.id === props.addressId);
            return address;
        })();
        this.state.curAddressId = props.addressId;
        this.state.router = props.router;
        console.log("this.initStateeeeeeeeeeeeeeeee");

    }
    componentDidMount() {
        // this.initState(this.props);
        Taro.hideLoading();

    }
    componentDidUpdate() {
        Taro.hideLoading();
    }
    /* 点击支付按钮触发的事件 */
    async confirmToPay() {
        if (!this.state.curAddress) {
            /* 还没填写地址 */
            Taro.showToast({
                title: "请先填写地址",
                icon: "none",
                duration: 1000
            })
            return false;
        }
        const { confirm } = await Taro.showModal({ content: "确认支付吗？" })
        return confirm;

    }
    async onPay() {
        try {
            let orderParams = {
                userId: this.props.userId,
                // isPaid: true,//是否已经付钱了，因为有的可能是下单了，但是没付钱
                info: {//订单信息
                    businessInfo: { ...this.state.curBusiness },
                    // businessInfo: {//商家的信息
                    //     businessId: businessInfo.id,
                    //     logoSrc: businessInfo.logoSrc,
                    //     name: businessInfo.name,
                    //     phone: businessInfo.phone,
                    //     location: businessInfo.location,
                    //     packFee: businessInfo.packFee,
                    //     deliverFee: businessInfo.deliverFee
                    // },
                    cart: { ...this.state.curBusiness.curCart }
                },
                targetAddress: { ...this.state.curAddress },
            }
            if (!this.state.curAddress) {
                /* 还没填写地址 */
                Taro.showToast({
                    title: "请先填写地址",
                    icon: "none",
                    duration: 1000
                })
                return false;
            }
            const { confirm } = await Taro.showModal({ content: "确认支付吗？" })
            if (confirm) {
                await Taro.showToast({
                    title: "支付成功",
                    icon: "success",
                    duration: 1000
                });
                console.log(orderParams)
                console.log("创建订单成功！")
                console.log(data);
                orderParams.isPaid = true;
            } else {
                orderParams.isPaid = false;
            }
            const data = await addOrder(orderParams);
            Taro.redirectTo({
                url: `/pages/orderDetail/index?id=${data.id}`
            })


        } catch (error) {
            console.log("支付发生错误")
            console.log(error)
        }

    }
    getSendTime() {
        // console.log("this.state.curBusiness.deliverTime")
        // console.log(this.state.curBusiness.deliverTime)
        // console.log(this.state.curBusiness)
        if (!this.state.curBusiness) {
            return 0;
        }
        return moment().add(this.state.curBusiness.deliverTime, "hour").format("HH:mm")
    }
    getMainComp() {

        return (
            <View className="confirmOrderPage">
                <Address />
                <View className="someInfo">
                    <View className="item">
                        <View className="title">尽快送达</View>
                        <View className="value">预计{this.getSendTime()}送达</View>
                    </View>
                    <View className="item">
                        <View className="title">支付方式</View>
                        <View className="value">在线支付</View>
                    </View>
                </View>
                <DetailPrice />
            </View>
        )
    }
    getBottomComp() {
        const { deliverFee, packFee, curCart } = this.state.curBusiness ? this.state.curBusiness : { curCart: {} };
        const totalPrice = Number(deliverFee + packFee + curCart.nowTotalPrice).toFixed(2);
        return (
            <View className="payWrapper">
                <View className="left">
                    <View className="totalPrice">￥{totalPrice}</View>
                </View>
                <View className="right">
                    <Button className="payBtn" onClick={this.onPay}>去支付</Button>
                </View>
            </View>
        )
    }
    render() {
        console.log("this.state,this.props")
        console.log(this.state, this.props)
        return (
            <Context.Provider value={{ ...this.state }}>
                <Block>
                    <Layout
                        // scrollHeight={1100}
                        padding={{ left: 30, right: 30 }}
                        renderBottom={() => {
                            return <Block>{this.getBottomComp()}</Block>
                        }}
                        renderChildren={() => {
                            return <Block>{this.getMainComp()}</Block>
                        }}
                    />
                </Block>
                {/* <Block>{this.getMainComp()}</Block> */}
            </Context.Provider>
        );
    }
}
let mapStateToProps = (state, { addressList, businessList, ...ownProps }) => {
    console.log("state.user.iddddddddddddddddd")
    console.log(state.user.id)
    return {
        userId: state.user.id,
        addressList: state.user.address,
        businessList: state.business.curBusiness,
        userLocation: state.location.user.location,
        ...ownProps
    }
};
let mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};
// export default index;
export default connect(mapStateToProps, mapDispatchToProps)(index);