import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import MyIcon from "../../components/common/MyIcon"
import Header from "./components/Header"
import MallNav from "./components/MallNav"
import OrderRemind from "../../components/common/OrderRemind"
import Banner from "./components/Banner"
import RecommendBusiness from "./components/RecommendBusiness"
import Layout from "../../components/common/Layout"
// import LoadingWrapper from "@/components/common/LoadingWrapper"
import AddressItem from "@/components/common/AddressItem"
import AddressList from "@/components/common/AddressList"
import { connect } from "@tarojs/redux"
import Main from "./components/Main"
import { getInfo } from "@/pageCommunication"
import MyNavBar from "@/components/common/MyNavBar"
export default class index extends Component {
    // lastPage = null
    config = {

        navigationBarTitleText: '收获地址列表',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props);
        let communication = getInfo(this.$router.path)
        console.log("communicationnnnnnnnnnnnnn")
        console.log(communication)
        if (communication && communication.info === "selectAddress") {
            this.lastPageInfo = communication.origin
        }
        // this.lastPage = this.$router.params.lastPage;
    }
    // componentDidShow() {
    //     this.lastPage = this.$router.params.lastPage;
    // }
    // componentDidHide() {
    //     this.lastPage = null;
    // }

    render() {
        return (
            <Block>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <Main lastPage={this.lastPageInfo} />
            </Block>
        )
    }
}

