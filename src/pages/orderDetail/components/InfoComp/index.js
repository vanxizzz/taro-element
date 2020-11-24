import Taro, { Component } from '@tarojs/taro'
import { View, Text } from "@tarojs/components"
import "./index.scss"
export default class index extends Component {
    static defaultProps = {
        type: "",
        data: [
            // {
            //     label: "配送时间",
            //     value: ["测试","测试2"]
            // }
        ]
    }
    render() {
        const { data = [], type } = this.props;
        return (
            <View className="infoWrapper commonWrapperClass">
                <View className="title">{type}</View>
                <View className="itemWrapper">
                    {data.map(item => {
                        return (
                            <View key={item.label} className="item">
                                <View className="label">{item.label}：</View>
                                <View className="value">
                                    {item.value.map(it => {
                                        return <View key={it} className="valueItem">{it}</View>
                                    })}
                                </View>
                            </View>
                        )
                    })}

                    {/* <View className="item">
                        <View className="label">{"送达时间"}：</View>
                        <View className="value">
                            <View className="valueItem">{"测试"}</View>
                            <View className="valueItem">{"测试3"}</View>
                            <View className="valueItem">{"测试4"}</View>
                        </View>
                    </View> */}
                </View>
            </View>
        )
    }
}
