import  { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
class index extends Component {
    static defaultProps = {
        prefixClass: "_global_iconfont",
        value: "",
        size: 24,
        color: "#02B6FD",
        onClick() { },
        className: "",
        style: {}
    }
    static options = {
        addGlobalClass: true
    }

    render() {
        return (
            <View
                className={`${this.props.prefixClass} ${this.props.prefixClass}-${this.props.value} ${this.props.className}`}
                style={{
                    display: "inline-block",
                    fontSize: this.props.size * 2 + "rpx",
                    color: this.props.color,
                    ...this.props.style
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    this.props.onClick(e)
                }}
            />
        );
    }
}

export default index;