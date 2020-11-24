import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtInput, AtForm } from "taro-ui"
import './index.scss'
import { selectMenuByBusinessId } from "../../apis/front/menu"
import { selectSomeNearestBusiness } from "../../apis/front/business"
import Main from "./components/Main"
import MyNavBar from "@/components/common/MyNavBar"
class index extends Component {
    config = {
        navigationBarTitleText: '订单页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    render() {
        return (
            <Block>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />

                <Main />
            </Block>
        )
    }
}

export default index;