import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import Header from "./components/Header"
import Tickets from "./components/Tickets"
import OrderRemind from "@/components/common/OrderRemind"
import ItemList from "./components/ItemList"
import Layout from "@/components/common/Layout"
import LoadingWrapper from "@/components/common/LoadingWrapper"
import FooterNav from "@/components/common/FooterNav"
import MyNavBar from "@/components/common/MyNavBar"
class index extends Component {
    config = {
        navigationBarTitleText: '我的页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor() {
        super(...arguments);
    }
    // async componentDidMount() {
    //     await loginOneUserInfo()
    // }
    render() {
        return (
            <Block>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <LoadingWrapper
                    renderChildren={() => <Layout
                        padding={{left: 30,right:30,bottom: 120}}
                        needFooterNav
                        renderBottom={() => {
                            return <FooterNav current={2} />
                        }}
                        renderChildren={() => {
                            return (
                                <Block>
                                    <Header />
                                    <Tickets />
                                    <OrderRemind />
                                    <ItemList />
                                </Block>
                            )
                        }}
                    />}
                />
            </Block>

        );
    }
}

export default index;