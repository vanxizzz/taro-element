import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import deepCompare from "../../../utils/deepCompare"
class index extends Component {
    static defaultProps = {
        show: true,
        wrapperStyle: {},//作用在父级的
        style: {},//作用在每一个view的
        data: [],//每一项的text和isChecked和style比较特别，其他的随便传
        mode: "checkbox",//checkbox或radio或onlyShow只展示
        onClick() { }
    }
    /* props变化时，state变回初始状态 */
    componentWillReceiveProps(newProps) {
        if (deepCompare(this.props.data, newProps.data) && this.props.show === newProps.show) {
            /* 一样，什么都不做 */
        } else {
            /* 不一样的话，让数据恢复到初始状态 */
            this.setState(prevState => {
                return {
                    ...prevState,
                    cur: this.getCurState(newProps.data)
                }
            })
        }
    }
    /* 通过传入的data映射为state的cur */
    getCurState(data) {
        const cur = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].isChecked) {
                cur.push(i);
            }
        };
        return cur;
    }
    constructor(props) {
        super(props);
        this.state = {
            cur: this.getCurState(props.data),
        }
    }
    /**
     *
     *
     * @param {*} value
     * @param {*} index
     * @param {*} status 状态，点击后，uncheked说明现在没选中，checked说明现在选中了
     * @memberof index
     */
    handleTag(infoObj) {
        this.setState(prevState => {
            let newCur = [];
            if (this.props.mode === "checkbox") {
                if (infoObj.status === "unchecked") {
                    newCur = prevState.cur.filter(item => item !== infoObj.index)
                } else if (infoObj.status === "checked") {
                    newCur = [...prevState.cur, infoObj.index];
                }
                this.props.onClick({ ...infoObj, cur: newCur });
            } else if (this.props.mode === "radio") {
                newCur = [infoObj.index];
                this.props.onClick({ ...infoObj, cur: newCur[0] });
            }
            return {
                ...prevState,
                cur: newCur
            }
        })
    }
    render() {

        return (
            <View className="tagWrapper" style={this.props.wrapperStyle}>
                {this.props.data.map((item, i) => {
                    if (this.props.mode === "onlyShow") {
                        return (
                            <View style={{
                                ...this.props.style,
                                ...item.style
                            }} className="tag">{item.text}</View>
                        )
                    }
                    let className = "tag";
                    let isCur = this.state.cur.includes(i);

                    className += ` ${isCur ? "cur" : ""}`;
                    return (
                        <View style={{
                            ...this.props.style,
                            ...item.style
                        }} key={item.text} className={className} onClick={() => {
                            let status = isCur ? "unchecked" : "checked"
                            if (this.props.mode === "radio") {
                                status = "checked"
                            }
                            this.handleTag({ value: item, index: i, status })
                        }}>{item.text}</View>
                    )
                })}
            </View>
        );
    }
}

export default index;