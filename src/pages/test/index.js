import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtInput, AtForm } from "taro-ui"
import './index.scss'
import { selectMenuByBusinessId } from "../../apis/front/menu"
import { selectSomeNearestBusiness } from "../../apis/front/business"

class index extends Component {
    config = {
        navigationBarTitleText: '测试页',
    }
    render() {
        console.log(this.$router)
        return (
            <View>
                <Button onClick={()=>{   
                    Taro.navigateBack()
                 }}>回去orderDetail页</Button>
            </View>
        );
    }
}

export default index;