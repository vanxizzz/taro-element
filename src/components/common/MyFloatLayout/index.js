import { Component } from '@tarojs/taro'
import "./index.scss"
import { View, ScrollView } from "@tarojs/components"
// import Scroll from "../Scroll"
// import { connect } from "@tarojs/redux"
class index extends Component {
    static defaultProps = {
        show: false,
        renderChildren() { },
        renderBottom() { },
        viewHeight: 800,
        bottomHeight: 100,
        onMaskClick() { },
        haveScroll: true,//是否有滚动条
        mainInfoStyle: {}
    }
    constructor(props) {
        super(props);
        // this.state = {
        //     show: this.props.show
        // }
    }
    componentDidMount() {

    }
    stopPropagation(e) {
        e.stopPropagation()
    }
    debounceTag = false
    render() {
        const scrollHeight = this.props.viewHeight - this.props.bottomHeight + "rpx";
        return (
            <Block>
                <View
                    className={`myFloatLayout ${this.props.show ? "show" : "hide"}`}
                    style={{
                        zIndex: this.props.show ? 99 : -99
                    }}

                    onClick={(e) => {
                        if (this.debounceTag) {
                            return;
                        }
                        this.debounceTag = true;
                        setTimeout(() => {
                            this.debounceTag = false;
                        }, 1000);
                        e.stopPropagation();
                        this.props.onMaskClick();
                    }}
                >
                    <View className="temp" onClick={this.stopPropagation}>
                        <View
                            className={`mainInfo ${this.props.show ? "show" : "hide"}`}
                            style={{
                                height: this.props.viewHeight + "rpx",
                                ...this.props.mainInfoStyle
                            }}>
                            {
                                this.props.haveScroll
                                    ?
                                    <ScrollView scrollY style={{
                                        height: scrollHeight
                                    }} >
                                        {this.props.show && this.props.renderChildren()}
                                    </ScrollView>
                                    :
                                    <Block>{this.props.show && this.props.renderChildren()}</Block>
                            }

                            <View className="bottom" style={{
                                height: this.props.bottomHeight + "rpx"
                            }}>
                                {this.props.show && this.props.renderBottom()}
                            </View>
                        </View>

                    </View>

                </View>

            </Block>
        )
    }
}
export default index;
