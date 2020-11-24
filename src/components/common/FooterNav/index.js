import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from "taro-ui"
import './index.scss'
import { connect } from "@tarojs/redux"
class index extends Component {
    static defaultProps = {
        current: 0,
        userId: null
    }
    // static options = {
    //     addGlobalClass: true
    // }
    navChange(index) {
        if (+index === +this.props.current) {
            return false;
        }
        if (this.props.userId == null && index === 1) {
            Taro.redirectTo({
                url: "/pages/login/index"
            });
            return;
        }
        //跳转
        let pages = [
            "/pages/index/index",
            "/pages/order/index",
            "/pages/own/index"
        ]
        Taro.redirectTo({
            url: pages[index]
        })
    }
    render() {
        return (
            <View className="footerNav">
                <AtTabBar
                    fixed
                    iconSize="36"
                    backgroundColor="#fff"
                    color="#000"
                    selectedColor="#02B6FD"
                    tabList={[
                        { title: '外卖', iconPrefixClass: "_global_iconfont", iconType: "eleIcon", },
                        { title: '订单', iconPrefixClass: "_global_iconfont", iconType: "menuIcon", },
                        { title: '我的', iconPrefixClass: "_global_iconfont", iconType: "myIcon", },
                    ]}
                    onClick={(index) => this.navChange(index)}
                    current={this.props.current}
                />
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => {
    return {
        userId: state.user.id,
        ...ownProps
    }
};

export default connect(mapStateToProps)(index);