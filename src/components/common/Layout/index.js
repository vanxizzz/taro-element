import { Component } from '@tarojs/taro'
import "./index.scss"
import { View } from "@tarojs/components"
import Scroll from "../Scroll"
import { connect } from "@tarojs/redux"
import getParams from "@/utils/getParams"
// import LoadingWrapper from "../LoadingWrapper"
class index extends Component {
    static defaultProps = {
        needOnReachBottom: false,//可传
        onReachBottom() { },
        // scrollHeight: 1000,//可传
        scrollHeight: getParams.height,//可传
        renderChildren() { },//渲染的内容
        renderBottom: null,//渲染的内容
        padding: {
            // left: 15,
            // right: 15,
            // bottom: 15,
            // top:15
        },//scroll的padding，单位rpx

        // scrollPadding: 15,//4个方向的scroll的padding，单位rpx
        scrollBackgroundColor: "#fff",//scroll的背景
        // scrollIntoView: ""//传id值，会滚动到对应id值
    }
    deviceParams = getParams
    constructor(props) {
        super(props);
        this.padding = {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            forceTop: null,//强制top值，也就是说，不会加上最上边的导航的高度
            ...props.padding
        };

    }
    render() {
        console.log("Layout组件")
        // console.log(this.state.scrollHeight - this.props.scrollPadding * 2 + "rpx")
        // console.log(this.props.scrollHeight - this.props.scrollPadding * this.deviceParams.ratio + "rpx")
        // console.log(this.props)
        return (
            <Block>
                <View className="pageSetting" >
                    <View className="scrollWrapper" style={{
                        height: this.props.scrollHeight + "rpx",
                        paddingLeft: this.padding.left + "rpx",
                        paddingRight: this.padding.right + "rpx",
                        paddingBottom: this.padding.bottom + "rpx",
                        paddingTop: this.padding.forceTop !== null ? this.padding.forceTop + "rpx" : getParams.topBarHeight + this.padding.top + "rpx",
                        backgroundColor: this.props.scrollBackgroundColor,
                        // paddingTop: "120rpx"
                    }}>
                        <Scroll
                            // scrollIntoView={this.props.scrollIntoView}
                            // height={this.props.scrollHeight - this.props.scrollPadding * 2 + "rpx"}
                            // height={this.props.scrollHeight - this.props.scrollPadding * this.deviceParams.ratio + "rpx"}
                            height={this.props.scrollHeight - this.padding.bottom + "rpx"}
                            direciton="Y"
                            onReachBottom={(obj) => {
                                if (this.props.needOnReachBottom) {
                                    this.props.onReachBottom(obj);
                                }
                            }}  >
                            {this.props.renderChildren()}
                        </Scroll>
                    </View>
                    <View className="bottom" >
                        {this.props.renderBottom()}
                        {/* {this.props.needFooterNav && <FooterNav current={this.props.current} />} */}

                    </View>
                </View>
            </Block>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    console.log("属性222")
    return ({
        ...ownProps,
    })
};
let mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps)
    console.log("属性")
    return ({
        // onReachBottom() {
        //     // console.log("测试?????")
        //     // dispatch({ type: "business/asyncSelectNextPageBusiness" });
        // },
        ...ownProps
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
