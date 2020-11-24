import Taro, { PureComponent, Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import MyNavBar from "@/components/common/MyNavBar"
import Main from "./components/Main"
class index extends Component {
    config = {
        navigationBarTitleText: '搜索页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    render() {
        return (
            <Block>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <Main />
            </Block>


        );
    }
}
export default index;
