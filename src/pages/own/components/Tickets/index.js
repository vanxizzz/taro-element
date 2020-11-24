import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from "@tarojs/components"
import img from "@/assets/imgs/avatar/5.png"
import MyIcon from "../../../../components/common/MyIcon"
import "./index.scss"
import { connect } from "@tarojs/redux"
class index extends Component {
    render() {

        return (
            <View className="ticketWrapper">
                <View className="item">
                    <View className="info">
                        <View className="title">红包</View>
                        {this.props.isLoaded ? <View className="num"><Text className="red">3</Text>个未使用</View> : <View className="num">登录后查看</View>}

                        {/* <View className="num"><Text className="red">3</Text>个未使用</View> */}
                    </View>
                    <View className="img">
                        <MyIcon prefixClass="_global_iconfont" value="redPacketIcon" size="30" color="#f40" />
                    </View>
                </View>
                <View className="item">
                    <View className="info">
                        <View className="title">余额</View>
                        {this.props.isLoaded ? <View className="num"><Text className="red">￥36.5</Text></View> : <View className="num">登录后查看</View>}
                        {/* <View className="num"><Text className="red">3</Text>个未使用</View> */}
                    </View>
                    <View className="img">
                        <MyIcon prefixClass="_global_iconfont" value="surplusIcon" size="30" color="#02B6FD" />
                    </View>
                </View>
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    isLoaded: !state.user.id && state.user.id !== 0 ? false : true,
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);