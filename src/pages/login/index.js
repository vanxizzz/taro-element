import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import MyIcon from "@/components/common/MyIcon"
import getUserPhone from "@/apis/front/getUserPhone"
import LoadingWrapper from "@/components/common/LoadingWrapper"
import getLastPage from "@/utils/getLastPage"
import MyNavBar from "@/components/common/MyNavBar"
import getParams from "@/utils/getParams"
import handleModule from "@/utils/handleModule"
class index extends Component {
    static defaultProps = {
        onLogin() { },
        showLoading() { },
        hideLoading() { }
    }
    config = {
        navigationBarTitleText: '登录页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props)

        // console.log(Taro.getCurrentPages());
    }
    async componentDidMount() {
        // const { code } = await Taro.login();
        // console.log(code)
        // this.setState(prev => {
        //     return {
        //         ...prev,
        //         code
        //     }
        // })
    }

    async getPhone(e) {
        try {
            const { code } = await Taro.login();
            console.log(code)
            // this.setState(prev => {
            //     return {
            //         ...prev,
            //         code
            //     }
            // })
            // handleModule("该模块未开发，请使用手机登录")
            // return;
            // this.props.showLoading();
            console.log("加载了呀")
            console.log(e)
            // const { userInfo, encryptedData, iv } = await Taro.getUserInfo({
            //     withCredentials: true,
            //     lang: "zh_CN",
            // });
            // const { phoneNumber } = await getUserPhone({ encryptedData, iv, code });
            // const lastPage = getLastPage();
            // let pages = Taro.getCurrentPages();
            // let lastPage = pages[pages.length - 2];
            // if (!lastPage) {
            //     lastPage = "/pages/index/index"
            // } else {
            //     lastPage = "/" + lastPage.route.replace(/^\//, "")
            // }

            // this.props.hideLoading();
            // this.props.onLogin({ phone: phoneNumber, redirectUrl: lastPage, name: userInfo.nickName, avatar: userInfo.avatarUrl })
        } catch (error) {
            this.props.hideLoading();
            console.log("错误")
            console.log(error)
        }
    }
    render() {
        return (
            <View>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />

                <View style={{ paddingTop: getParams.topBarHeight + "rpx" }}>
                    <LoadingWrapper
                        renderChildren={() => (
                            <View className="login">
                                <View className="logoWrapper">
                                    <View className="logo">
                                        <MyIcon prefixClass="_global_iconfont" value="eleIcon" size={100} color="#02B6FD" />
                                    </View>
                                </View>
                                <View className="title">
                                    饿了么外卖
                            </View>
                                <View className="loginMethodWrapper">
                                    <Button
                                        openType="getPhoneNumber"
                                        className="btn btn-wechat"
                                        onClick={this.getPhone}>微信账号一键登录</Button>
                                    <Button onClick={() => {
                                        Taro.redirectTo({
                                            url: "/pages/phoneLogin/index"
                                        })
                                    }} plain className="btn btn-phone" >使用手机号码登录</Button>
                                </View>
                                <View className="loginProtocol">
                                    登录代表您已同意
                    <Text className="protocol">《用户服务协议》</Text>
                                    <Text className="protocol">《隐私权政策》</Text>

                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>


        );
    }
}
let mapStateToProps = (state, ownProps) => ({
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin({ phone, avatar, name, redirectUrl }) {
        dispatch({ type: "user/asyncLogin", payload: { phone, avatar, name, redirectUrl, type: "wechat" } })
    },
    showLoading() {
        dispatch({ type: "forceLoading/asyncShowLoading" })
    },
    hideLoading() {
        dispatch({ type: "forceLoading/hideLoading" })
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(index);