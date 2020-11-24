import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from "@tarojs/components"
import Main from "./components/Main"
import { createCommunication, removeCommunicationByTargetUrl } from "@/pageCommunication"
import getLastPage from "@/utils/getLastPage"
import MyNavBar from "@/components/common/MyNavBar"
class index extends PureComponent {
    config = {
        navigationBarTitleText: '确认订单页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props);
        /* businessId为999是测试用 */
        this.businessId = Number(this.$router.params.businessId ? this.$router.params.businessId : 999);
        // this.addressId = Number(this.$router.params.addressId ? this.$router.params.addressId : 1);
        this.addressId = Number(this.$router.params.addressId);
        console.log("this.businessIddddddddddd")
        console.log(this.businessId)
        /* 测试用👇👇 */
        this.myRouter = {
            path: this.$router.path,
            params: {
                businessId: this.$router.params.businessId ? this.$router.params.businessId : this.businessId,
                addressId: this.addressId
            }

        }
        /* 测试用👆👆 */
        console.log("噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢")
        console.log(this.businessId)
        console.log(this.addressId)
    }

    componentWillUnmount() {
        // console.log("getLastPageeeeeeeeeeee")
        // console.log(getLastPage());

        // Taro.redirectTo({
        //     url: `/pages/business/index?id=${this.businessId}`
        // });
    }
    componentDidShow() {
        /* 断开之前的联系 */
        removeCommunicationByTargetUrl("/pages/address/index");
        /* 一开始要加载东西 */
        Taro.showLoading({
            title: '加载中',
            mask: true,
        });

        // wx.disableAlertBeforeUnload({
        //     message: "确定离开页面？",
        //     success() {
        //         console.log("enableAlertBeforeUnloaddddddddd")
        //         // wx.disableAlertBeforeUnload();
        //         Taro.redirectTo({
        //             url: `/pages/business/index?id=${this.businessId}`
        //         });
        //     }
        // })
    }
    render() {
        console.log("index页面")
        return <Block>
            <MyNavBar  title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                    
            <Main router={{ ...this.myRouter }} businessId={this.businessId} addressId={this.addressId} />
        </Block>;
    }
}
export default index;