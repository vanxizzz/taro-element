import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import Main from "./components/Main"
import MyNavBar from "@/components/common/MyNavBar"
import getParams from "@/utils/getParams"
class index extends Component {
    config = {
        navigationBarTitleText: '订单详细页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props);
        this.theOrderId = Number(this.$router.params.id ? this.$router.params.id : 1);
    }
    componentDidHide() {
        // Taro.redirectTo({
        //     url: "/pages/order/index"
        // })
    }
    render() {
        return (
            <Block>
                <MyNavBar onTurnToLastPage={() => {
                    Taro.redirectTo({
                        url: "/pages/order/index"
                    })
                }} title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <View style={{ paddingTop: getParams.topBarHeight + "rpx" }}>
                    <Main theOrderId={this.theOrderId} />
                </View>
            </Block>
        )

    }
}
export default index;