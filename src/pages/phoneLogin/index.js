import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Block, Form } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtInput, AtForm, AtMessage } from "taro-ui"
import MyIcon from "@/components/common/MyIcon"
import getUserPhone from "@/apis/front/getUserPhone"
import LoadingWrapper from "@/components/common/LoadingWrapper"
import identifyCode from "../../apis/identifyCode"
import delay from "@/utils/delay"
import getLastPage from '../../utils/getLastPage'
import MyNavBar from "@/components/common/MyNavBar"
import getParams from "@/utils/getParams"
import Loading from "@/components/common/Loading"
import { loginOneUserInfo } from "@/apis/front/user"
class index extends Component {
    static defaultProps = {
        onLogin() { },
        showLoading() { },
        hideLoading() { }
    }
    config = {
        navigationBarTitleText: '手机号登录',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    state = {
        phone: "",
        code: "",
        isSendCode: false,//是否发送了验证码
        timeRemaining: 20//剩余n秒后可以重新发送验证码
    }
    initTimeRemaining = 20
    timer = null//定时器

    componentDidMount() {
        identifyCode.bindEvent({
            onTimeRemainingChange: (time) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        timeRemaining: time
                    }
                })
            },
            onTimeRemainingEnd: () => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        isSendCode: false,
                        timeRemaining: this.initTimeRemaining
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }
    async getCode() {
        console.log(this.state.isSendCode)
        if (this.state.isSendCode) {
            /* 走到这，说明请求过验证码，而且时间还没过完 */
            // Taro.atMessage({
            //     message: `请${identifyCode.getTimeRemaining()}秒后再获取`,
            //     type: "warning",
            //     duration: 5000
            // });
            return;
        }
        clearInterval(this.timer);
        const code = await identifyCode.updateCode(this.state.timeRemaining);
        this.setState(prevState => {
            return {
                ...prevState,
                isSendCode: true
            }
        })
        Taro.showModal({
            content: "验证码：" + code,
        })
        // Taro.atMessage({
        //     message: "验证码：" + code,
        //     type: "success",
        //     duration: 5000
        // })
    }
    async onSubmit() {
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         show: true
        //     }
        // })
        await delay(200)//不知道是什么原因，如果快速点击提交，不会获取到最新的state
        if (this.state.code !== identifyCode.getCode()) {
            Taro.showModal({
                content: `验证码错误，输入的code：${this.state.code}，正确code：${identifyCode.getCode()}`
            })
            // Taro.atMessage({
            //     message: "验证码错误",
            //     type: "error",
            //     duration: 5000
            // });
            return;
        }
        const { code, phone } = this.state;
        // let pages = Taro.getCurrentPages();
        // let lastPage = pages[pages.length - 2];
        // if (!lastPage) {
        //     lastPage = "/pages/index/index"
        // } else {
        //     lastPage = "/" + lastPage.route.replace(/^\//, "")
        // }
        const lastPage = getLastPage();
        // * asyncLogin({ payload: { type, phone, code, redirectUrl, ...props } }, { call, put, select }) {
        // console.log(type, phone, redirectUrl)
        const res = await loginOneUserInfo({ phone, type: "login", identifyCode: code})
        // const res = yield call(loginOneUserInfo, { phone, type, identifyCode: code, ...props });
        // yield put({ type: "login", payload: res });
        // Taro.redirectTo({
        //     url: redirectUrl
        // })
        this.props.onLogin({ ...res });
        Taro.redirectTo({
            url: lastPage
        })
        // },
        // this.props.onLogin({
        //     phone,
        //     code,
        //     redirectUrl: lastPage,
        // })
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         show: false
        //     }
        // })
        // try {

        //     this.props.showLoading();

        // } catch (error) {

        //     this.props.hideLoading();
        // }

    }
    changeValue({ prop, value }) {
        this.setState({
            ...this.state,
            [prop]: value
        })
    }
    render() {
        const { code, phone, timeRemaining, isSendCode } = this.state;
        console.log(timeRemaining, isSendCode)
        console.log("render")
        return (
            <View>
                {/* <Loading show={this.state.show} /> */}
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <View style={{ paddingTop: getParams.topBarHeight + "rpx" }}>
                    {/* <LoadingWrapper
                        renderChildren={() => (
                            )}
                    /> */}
                    <Block>
                        <AtMessage />
                        <View className="login">

                            <View className="loginForm">
                                <View className="item phone">
                                    <Input value={this.state.phone} onChange={({ detail: { value } }) => {
                                        this.changeValue({ prop: "phone", value })
                                    }} placeholder="请输入手机号" />
                                </View>
                                <View className="item code">
                                    <Input value={this.state.code} onChange={({ detail: { value } }) => {
                                        this.changeValue({ prop: "code", value })
                                    }} placeholder="请输入验证码" />
                                    <Button onClick={this.getCode} className="sendBtn">
                                        {this.state.isSendCode === true ? `${this.state.timeRemaining}秒后获取` : "获取验证码"}
                                    </Button>
                                </View>
                                <View className="loginBtnWrapper">
                                    <Button className="loginBtn" onClick={this.onSubmit}>同意协议并登录</Button>
                                </View>
                                <View className="protocolWrapper">
                                    <Text>
                                        已经阅读并同意
                                                <Text className="protocol">《用户服务协议》</Text>
                                        <Text className="protocol">《隐私权政策》</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Block>

                </View>
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin(data) {
        dispatch({ type: "user/login", payload: data })
    },
    showLoading() {
        dispatch({ type: "forceLoading/asyncShowLoading" })
    },
    hideLoading() {
        dispatch({ type: "forceLoading/hideLoading" })
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(index);