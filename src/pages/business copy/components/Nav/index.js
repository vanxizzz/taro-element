import Taro, { Component } from '@tarojs/taro'
import "./index.scss"
import { View, Image, Text } from "@tarojs/components"
// import { AtTabsPane, AtTabs } from "taro-ui"

// import MyIcon from "@/components/common/MyIcon"
// import logoSrc from "@/assets/imgs/waimai/1.jpg"
// import bgSrc from "@/assets/imgs/big/lg5.jpg"
import MyTabList from "@/components/common/MyTabList"
import Context from "../../businessContext"
import handleModule from "@/utils/handleModule"
import getParams from "@/utils/getParams"
export default class index extends Component {
    static contextType = Context
    handleClick(index) {
        console.log(index);
        if (index !== 0) {
            handleModule();
            return;
        }
        this.setState({
            ...this.state,
            current: index
        })
    }

    state = {
        current: 0
    }
    tabData = [
        {
            title: "菜单",
        },
        {
            title: "评论",
        },
        {
            title: "商家",
        },
    ]
    render() {
        const { nav } = this.context.height ? this.context.height : {};
        let style = {}
        if (this.context.fixedSomeComp) {
            style = {
                width: "100%",
                position: "fixed",
                top: getParams.topBarHeight + "rpx",
                left: 0,
                zIndex: 4,
                backgroundColor: "#fff",
            }
        }

        return (
            <View className="nav" style={{
                height: nav,
            }}>
                <MyTabList
                    height={nav}
                    style={style}
                    current={this.state.current}
                    tabData={this.tabData}
                    onClick={(index) => {
                        this.handleClick(index)
                    }}
                />
            </View>
        )
    }
}
