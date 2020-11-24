import { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import { AtIcon } from "taro-ui"
import MyIcon from "@/components/common/MyIcon"
import './index.scss'
import handleModule from "@/utils/handleModule"
class index extends Component {
    render() {
        return (
            <View className="orderRemind">
                <MyIcon prefixClass="_global_iconfont" value="alarmIcon" size={36} color="#02B6FD" />
                <View className="word">
                    <View className="title">
                        点餐提醒
                    </View>
                    <View className="data">
                        已有<Text className="num">53795</Text>人提醒自己按时吃饭
                    </View>
                </View>
                <Button className="startBtn" type="secondary" onClick={() => {
                    handleModule()
                }}>立即开启</Button>
            </View>
        );
    }
}

export default index;