import Taro, { Component } from '@tarojs/taro'
import "./index.scss"
import { View, Image, Text } from "@tarojs/components"
// import MyIcon from "@/components/common/MyIcon"
import tempLogoSrc from "@/assets/imgs/waimai/1.jpg"
// import bgSrc from "@/assets/imgs/big/lg5.jpg"
import Context from "../../businessContext"
export default class index extends Component {
    static contextType = Context
    render() {
        const { name, logoSrc = tempLogoSrc, lowestPrice, deliverFee, sellPerMonth, introduction = "", distance, deliverTime } = this.context.curBusiness?this.context.curBusiness:{};
        return (
            <View className="header" style={{
                height: this.context.height.header
            }}>
                <View className="bg" style={{
                    height: `calc(${this.context.height.header} - 100rpx)`
                }}>
                    <Image src={"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=819369845,3930286256&fm=11&gp=0.jpg"} className="bgImage" />
                </View>
                <View className="businessBaseInfo">
                    <View className="baseInfoWrapper">
                        <View className="left">
                            <View className="title">{name}</View>
                            <View className="additionalInfo">
                                <View className="item deliverTime">商家配送约{parseInt(deliverTime)}分钟</View>
                                <View className="item sellPerMonth">月售{sellPerMonth}</View>
                                <View className="item tag">开发票 食无忧</View>
                            </View>
                        </View>
                        <View className="right">
                            <Image src={logoSrc} className="businessLogo" />
                        </View>
                    </View>

                    <View className="introduction">
                        <Text className="word">
                            公告：
                            {introduction.substr(0, 23) + "..."}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
