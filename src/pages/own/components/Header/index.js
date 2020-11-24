import Taro, { Component } from '@tarojs/taro';
import { View, Text } from "@tarojs/components"
import img from "@/assets/imgs/avatar/5.png"
import "./index.scss"
import { connect } from "@tarojs/redux"
class index extends Component {
    static defaultProps = {
        isLoaded: false,
        name: "立即登录",
        shortIntroduction: "饿不饿都上饿了么",
        avatar: img
    }
    constructor(props) {
        super(props);
        if (!props.isLoaded) {
            this.props = {
                isLoaded: false,
                name: "立即登录",
                shortIntroduction: "饿不饿都上饿了么",
                avatar: img
            }
        }
    }
    handleClick() {
        if (!this.props.isLoaded) {
            Taro.navigateTo({
                url: "/pages/login/index"
            });
            return;
        }
    }
    render() {
        return (
            <View className="header" onClick={this.handleClick}>
                <View className="left">
                    <View className="name">{this.props.name}</View>
                    <View className="shortIntroduction">{this.props.shortIntroduction}</View>
                </View>
                <Image className="avatar" src={this.props.avatar} />
            </View>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    name: state.user.name,
    shortIntroduction: state.user.shortIntroduction,
    avatar: state.user.avatar,
    isLoaded: !state.user.id && state.user.id !== 0 ? false : true
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);