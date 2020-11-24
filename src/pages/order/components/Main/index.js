import Taro, { Component, PureComponent } from '@tarojs/taro'
import { connect } from "@tarojs/redux"
import { View, Text } from "@tarojs/components"
import { AtDivider } from 'taro-ui'
import { selectAllOrder } from "@/apis/front/order"
import FooterNav from "@/components/common/FooterNav"
import Layout from "@/components/common/Layout"
import imgSrc from "@/assets/imgs/waimai/1.jpg"
import "./index.scss"
import { formatTimestamp } from "@/utils/moment"
import { calcCart } from "@/utils/calcPrice"
import Loading from "@/components/common/Loading"
class index extends PureComponent {
    static defualtProps = {
        userId: null
    }
    constructor(props) {
        super(props);
        this.state.show = true;
    }
    async componentDidMount() {
        const data = await selectAllOrder(this.props.userId);
        console.log("dsa阿斯顿撒旦撒旦撒")
        console.log(this.props.userId)
        console.log(data)
        this.setState(prevState => {
            return {
                ...prevState,
                data,
                show: false
            }
        });
        console.log(data)
    }
    getMenu(orderMenu = []) {
        let str = "";
        for(let i = 0; i < orderMenu.length; i++){
            if(i>2){
                break;
            }
            str += `${orderMenu[i].menuName}、`
        };
        str = str.replace(/、$/,"");
        str += "等三件物品" 
        return str;
        // return "一碗香+米饭等3件商品";
    }
    getOrderItemComp() {
        const data = this.state.data ? this.state.data : [];
        console.log("dataaaaaaaaaaaaaaaaaa")
        console.log(data)
        return (
            <Block>
                <Loading show={this.state.show} />
                <View className="itemWrapper">
                    {data.map(item => {
                        const cart = item.info.cart;
                        const businessInfo = item.info.businessInfo;
                        return (
                            <View className="item" key={item.id} >
                                <View className="tempWrap" onClick={() => {
                                    console.log("item.idddddddddddd")
                                    console.log(item.id)
                                    Taro.navigateTo({
                                        url: `/pages/orderDetail/index?id=${item.id}`
                                    })
                                }}>
                                    <View className="businessInfo">
                                        <View className="info">
                                            <View className="imgWrapper"><Image src={businessInfo.logoSrc} className="img" /></View>
                                            <View className="nameAndCreateTime">
                                                <View className="name">
                                                    <Text className="word">{businessInfo.name}</Text>
                                                    <MyIcon value="rightArrowIcon" />
                                                </View>
                                                <View className="createTime">{formatTimestamp(item.createTime, "YYYY年MM月DD日 HH时mm分ss秒")}</View>
                                            </View>
                                        </View>
                                        <View className="orderStatus">
                                            {"订单已送达"}
                                        </View>
                                    </View>
                                    <View className="cartInfo">
                                        <View className="cart">{this.getMenu(item.info.cart.orderMenu)}</View>
                                        <View className="pay">￥{calcCart({ ...businessInfo, curCart: cart })}</View>
                                    </View>

                                </View>
                                <View className="btnWrapper">
                                    <Button plain className="btn btn-onemore" >再来一单</Button>
                                    <Button plain className="btn btn-remark">评价得金币</Button>
                                </View>
                            </View>

                        )
                    })}
                    {/* <View className="item">
                        <View className="businessInfo">
                            <View className="info">
                                <View className="imgWrapper"><Image src={imgSrc} className="img" /></View>
                                <View className="nameAndCreateTime">
                                    <View className="name">
                                        <Text className="word">木桶饭</Text>
                                        <MyIcon value="rightArrowIcon" />
                                    </View>
                                    <View className="createTime">2020-02-05 12:34:56</View>
                                </View>
                            </View>
                            <View className="orderStatus">
                                {"订单已送达"}
                            </View>
                        </View>
                        <View className="cartInfo">
                            <View className="cart">一碗香+米饭等3件商品</View>
                            <View className="pay">￥32.96</View>
                        </View>
                        <View className="btnWrapper">
                            <Button plain className="btn btn-onemore" >再来一单</Button>
                            <Button plain className="btn btn-remark">评价得金币</Button>
                        </View>
                    </View>
                     */}
                </View>

            </Block>
        )
    }

    render() {
        return (
            <Block>

                <Layout
                    // scrollPadding={0}
                    // scrollBackgroundColor="#f40"
                    scrollBackgroundColor="#F4F4F4"
                    renderBottom={() => {
                        return <FooterNav current={1} />
                    }}
                    renderChildren={() => {
                        return (
                            <View className="order">
                                {this.getOrderItemComp()}
                                <View className="noMore">我是有底线的~</View>
                            </View>
                        )
                    }}
                >
                </Layout>
                {/* <View className="order">
                    {this.getOrderItemComp()}
                    <View className="noMore">我是有底线的~</View>
                </View> */}
            </Block>
        )
    }
}
let mapStateToProps = (state, ownProps) => ({
    userId: state.user.id,
    ...ownProps
});

export default connect(mapStateToProps)(index);
