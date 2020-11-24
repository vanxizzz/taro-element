import  { Component } from '@tarojs/taro'
import { View,  Text, Image } from '@tarojs/components'
import MyIcon from "../MyIcon"
import './index.scss'
class index extends Component {
    static defaultProps = {
        infoObj: {},
        onClick() { }
    }
    /**
     * 
     * @param {*} infoObj 
     * @param {*} type item：整个本身，  more：更多的按钮
     */
    onClick(type = "item") {

        console.log("==========11")
        console.log(type)
        this.props.onClick(this.props.infoObj, type);
    }
    render() {
        const { name, logoSrc, deliverTime, shortIntroduction, lowestPrice, deliverFee, mark, sellPerMonth, distance } = this.props.infoObj
        return (
            <View className="businessItem" onClick={(e) => {
                this.onClick("item");
            }}>
                <View className="image">
                    <Image src={logoSrc} />
                    {/* <Image src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2813642381,2408651723&fm=26&gp=0.jpg" /> */}
                </View>
                <View className="right">
                    <View className="titleWrapper" >
                        {/* <View className="title">1号粥店</View> */}
                        <View className="title">{name}</View>
                        <MyIcon onClick={(e) => {
                            this.onClick("more");
                        }} prefixClass="_global_iconfont" value="moreIcon" size="20" color="#CDCDCD" />
                    </View>

                    <View className="elseInfo">
                        <View className="markAndSell">
                            <View className="mark">
                                <MyIcon prefixClass="_global_iconfont" value="starIcon" size="14" color="#f40" />
                                <Text className="markNum">{mark}</Text>
                            </View>
                            <View className="sell">月售{sellPerMonth}</View>
                        </View>
                        <View className="timeAndDistance">
                            <Text className="time">{deliverTime >= 1 ? (parseInt(deliverTime) === deliverTime ? deliverTime : deliverTime.toFixed(1)) + "小时" : parseInt(deliverTime * 60) + "分钟"}</Text>
                            <Text className="distance">{(+distance).toFixed(1)}km</Text>
                        </View>
                    </View>

                    <View className="someFee">
                        <View className="lowestPrice">
                            {/* 起送费 */}
                            起送￥{lowestPrice}
                        </View>
                        <View className="deliverFee">
                            {/* 配送费 */}
                            配送￥{deliverFee}
                        </View>
                    </View>
                    <View className="shortIntroduction">
                        <View className="word">
                            "{shortIntroduction}"
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

export default index;