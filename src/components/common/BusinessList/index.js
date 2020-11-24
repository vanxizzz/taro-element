import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtTabBar } from "taro-ui"
import BusinessItem from "../BusinessItem"
// import { connect } from "@tarojs/redux"
import './index.scss'
class index extends Component {
    static defaultProps = {
        data: [],
        onClick() { },

    }
    render() {
        return (
            <View className="businessList">
                {this.props.data.map(item => {
                    return (
                        <BusinessItem onClick={this.props.onClick} infoObj={item} key={item.id} />
                    )
                })}
            </View>
        );
    }
}



export default index;
