import Taro, { Component } from '@tarojs/taro'

export default (Comp) => {
    class ForceUpdateConnectComp extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            console.log("HOC")
            console.log(this.props)
            return (
                <Comp {...this.props} />
            )
        }
    };
    return ForceUpdateConnectComp;
}
