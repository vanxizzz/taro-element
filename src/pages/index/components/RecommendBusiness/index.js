import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from "taro-ui"
import MyTagGroup from "@/components/common/MyTagGroup"
import BusinessList from "@/components/common/BusinessList"
import './index.scss'
import businessContext from "../../context"
import handleModule from "@/utils/handleModule"
class index extends Component {
    // static defaultProps = {
    //     businessData: []
    // }
    static contextType = businessContext

    state = {
    }
    tagData = [
        // ,
        // "满减优惠",
        // "下单返红包",
        // "进店领红包",
        {
            text: "津贴优惠",
            value: "津贴优惠",
        },
        {
            text: "满减优惠",
            value: "满减优惠",
        },
        {
            text: "下单返红包",
            value: "下单返红包",
        },
        {
            text: "进店领红包",
            value: "进店领红包",
        },
    ]
    
    turnToBusinessPage(item, type) {
        if (type === "more") {
            /* 点击到了item的右上角... */
        } else if (type === "item") {
            /* 点击到了item */
            console.log("urlllll：", `/pages/business/index?id=${item.id}`)
            Taro.navigateTo({
                url: `/pages/business/index?id=${item.id}`
            })
        }
    }
    render() {
        let businessData = this.context.businessData ? this.context.businessData : [];
        return (
            <View className="recommendBusiness">
                <View className="title">推荐商家</View>
                <MyTagGroup mode="checkbox" data={[...this.tagData]} onClick={({ cur }) => {
                    handleModule(cur.map(index => this.tagData[index].value).join("、") + "未开发~")
                }} />
                <BusinessList onClick={(item, type) => {
                    this.turnToBusinessPage(item, type)
                }} data={[...businessData]} />
                <View className="loadingWrapper" style={{
                    position: "relative",
                    marginTop: "30rpx"
                }}>
                    <AtActivityIndicator mode='center'></AtActivityIndicator>
                </View>
            </View>
        );
    }
}

export default index;