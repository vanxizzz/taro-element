import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from "@tarojs/components"
import { AtList, AtListItem } from "taro-ui"
import { connect } from "@tarojs/redux"
import "./index.scss"
import handleModule from "@/utils/handleModule"
class index extends Component {
    static defaultProps = {
        isLogin: false
    }
    data = [
        {
            title: "我的地址",
            iconInfo: {
                prefixClass: "_global_iconfont",
                value: "locationIcon",
                size: 41,
                color: "#02B6FD"
            },
            navigateToUrl: "/pages/address/index"
        },
        {
            title: "我的收藏",
            iconInfo: {
                prefixClass: "_global_iconfont",
                value: "loveIcon",
                size: 41,
                color: "#02B6FD",

            },
            navigateToUrl: "/pages/test/index"
        },
        {
            title: "推荐有奖",
            iconInfo: {
                prefixClass: "_global_iconfont",
                value: "giftIcon",
                size: 41,
                color: "#02B6FD"
            },
            navigateToUrl: "/pages/test/index"
        },
        {
            title: "我的客服",
            iconInfo: {
                prefixClass: "_global_iconfont",
                value: "customerServiceIcon",
                size: 41,
                color: "#02B6FD"
            },
            navigateToUrl: "/pages/test/index"
        },
        {
            title: "规则中心",
            iconInfo: {
                prefixClass: "_global_iconfont",
                value: "ruleIcon",
                size: 41,
                color: "#02B6FD"
            },
            navigateToUrl: "/pages/test/index"
        },

    ]
    handleClick(url) {
        if(url !== "/pages/address/index"){
            handleModule();
            return;
        }
        if (!this.props.isLogin) {
            Taro.navigateTo({
                url: "/pages/login/index"
            });
            return;
        }
        
        Taro.navigateTo({
            url
        })
    }
    render() {
        console.log("itemmmmmmmmm")
        console.log(this.data)
        return (
            <View className="itemList">
                <AtList>
                    {this.data.map((item, i) => {
                        return (
                            <AtListItem
                                key={item.title}
                                title={item.title}
                                arrow='right'
                                iconInfo={item.iconInfo}
                                onClick={() => {
                                    this.handleClick(item.navigateToUrl)
                                }}
                            />
                        )
                    })}

                </AtList>
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    isLogin: !state.user.id && state.user.id !== 0 ? false : true
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);