import {  PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import MyIcon from "@/components/common/MyIcon"
import './index.scss'
class index extends PureComponent {
    static defaultProps = {
        show: false,
    }

    render() {
        if (this.props.show) {
            Taro.showLoading({
                title: '加载中',
                mask: true,
            })
        } else {
            Taro.hideLoading();
        }
        return (
            <Block>
                {this.props.show && <View className="mark" >
                    {/* <View className="loadingWrapper">
                        <MyIcon className="loadingIcon" prefixClass="_global_iconfont" value="loadingIcon" color="#cdcdcd" size="30" />
                    </View> */}
                </View>}

            </Block>
        );
    }
}

export default index;