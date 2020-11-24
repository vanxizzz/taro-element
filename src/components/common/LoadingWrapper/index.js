import  { Component, PureComponent } from '@tarojs/taro';
import {  Block } from "@tarojs/components"
import Loading from "@/components/common/Loading"
import { connect } from "@tarojs/redux"
class LoadingWrapper extends Component {
    static defaultProps = {
        show: false,
        renderChildren() { }
    }
    render() {
        return (
            <Block>
                <Loading show={this.props.show} />
                <Block>
                    {this.props.renderChildren()}
                </Block>
            </Block>
        );
    }
}
let mapStateToProps = (state, ownProps) => {
    const res = {
        show: state.loading.global,
        ...ownProps
    };
    return res;
};


export default connect(mapStateToProps)(LoadingWrapper);
