import Taro, { Component } from '@tarojs/taro'
import { View, Block } from "@tarojs/components"
import MyIcon from "../MyIcon"
import "./index.scss"
export default class index extends Component {
    static defaultProps = {
        curNum: 0,
        onChange() { }
    }
    render() {
        return (
            <View className="numCalc">
                {
                    this.props.curNum > 0
                    &&
                    <Block>
                        <MyIcon onClick={() => {
                            this.props.onChange({ type: "decrease", newNum: this.props.curNum - 1 })
                        }} value="decreaseIcon" size={34} />
                        <View className="item num">{this.props.curNum}</View>
                    </Block>
                }
                {/* <MyIcon value="decreaseIcon" value={34} /> */}
                <MyIcon onClick={() => {
                    this.props.onChange({ type: "increase", newNum: +this.props.curNum + 1 })
                }} value="addIcon" size={34} />
            </View>
        )
    }
}
