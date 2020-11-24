import Taro, { PureComponent } from '@tarojs/taro'
import './index.scss'


import Loading from "@/components/common/Loading"

class index extends PureComponent {
    config = {
        navigationBarTitleText: '饿了么',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props);
        this.state.show = true;
    }
    componentDidMount() {
        this.setState(prevState => ({ show: false }));
        Taro.navigateTo({
            url: "/pages/index/index"
        })
    }

    render() {
        return (
            <Loading show={this.state.show} />
        );
    }
}
export default index;
