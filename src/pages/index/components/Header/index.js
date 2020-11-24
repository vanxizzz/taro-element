import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MyIcon from "@/components/common/MyIcon"
import { connect } from "@tarojs/redux"
import './index.scss'
class index extends Component {
    static defaultProps = {
        locationName: "未定位"
    }
    render() {
        return (
            <View className="header">
                <View className="locationBar">
                    <MyIcon
                        prefixClass="_global_iconfont"
                        value="locationIcon"
                        size="30"
                        color="#02B6FD"
                    />
                    <Text className="locationName">{this.props.locationName.substr(0, 9) + ".."}</Text>
                    <View className="shadowBox">
                        <MyIcon prefixClass="_global_iconfont" value="arrowDownIcon" size="20" color="#999" />
                    </View>
                </View>
                <View className="searchBar" onClick={()=>{   
                    Taro.navigateTo({
                        url: "/pages/search/index"
                    })
                 }}>
                    <MyIcon
                        prefixClass="_global_iconfont"
                        value="searchIcon"
                        size="16"
                        color="#A9A9AA"
                    />
                    <Text className="placeholderWord">搜索商家、商品名称</Text>
                </View>
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    locationName: state.location.user.address
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
