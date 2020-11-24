import  { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
// import { AtTabBar } from "taro-ui"
import './index.scss'
class index extends Component {
    constructor(props) {
        super(props);
        this.props = {
            width: "200rpx",
            height: "200rpx",
            onReachBottom(...args) {//触底
                console.log("触底了")
            },
            ...props,
            children: props.children,
            // scrollIntoView: props.scrollIntoView ? props.scrollIntoView : "",
            direction: !props.direction ? "Y" : props.direction.toLocaleUpperCase()//统一变成大写
        }
        console.log(this.props.scrollIntoView)
    }
    getStyle() {
        const style = {};
        if (this.props.direction === "X") {
            style.width = this.props.width;
        } else if (this.props.direction === "Y") {
            style.height = this.props.height;
        }
        return style;
    }

    render() {
        console.log("Scroll组件")
        return (
            <View className="footerNav">
                <ScrollView
                    scrollWithAnimation={true}
                    onScrollToLower={this.props.onReachBottom}
                    scrollY={this.props.direction === "Y"}
                    scrollX={this.props.direction === "X"}
                    style={this.getStyle()}>
                    {this.props.children}
                </ScrollView>
            </View>
        );
    }
}

export default index;