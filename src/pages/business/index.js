import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import Main from "./components/Main"
import MyNavBar from "@/components/common/MyNavBar"
import { Random } from "mockjs"
export default class index extends PureComponent {
    config = {
        navigationBarTitleText: '商家页',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    state = {
        fixedSomeComp: false,
        show: false,
    }
    constructor(props) {
        super(props);
        this.id = Number(this.$router.params.id ? this.$router.params.id : 999);
    }
    onPageScroll(e) {
        console.log("踩踩踩")
        let { fixedSomeComp } = this.state;
        let canSetState = false;
        if (e.scrollTop <= 200) {
            if (fixedSomeComp === true) {
                canSetState = true;
                fixedSomeComp = false;
            }
        } else {
            if (fixedSomeComp === false) {
                canSetState = true;
                fixedSomeComp = true;
            }
        }
        if (canSetState) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    fixedSomeComp,
                }
            })
        }
    }
    componentDidShow() {
        this.setState(prevState => ({ ...prevState, show: true }))
    }
    componentDidHide() {
        this.setState(prevState => ({ ...prevState, show: false }))
    }
    render() {
        console.log("this.state.fixedSomeCooooooooooooomp")
        console.log(this.state.fixedSomeComp)
        return (
            <Block>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                {this.state.show && <Main businessId={this.id} fixedSomeComp={this.state.fixedSomeComp} />}



            </Block>
        )
    }
}