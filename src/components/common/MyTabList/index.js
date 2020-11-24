import { Component } from '@tarojs/taro'
import { View, Text } from "@tarojs/components"
import "./index.scss"
export default class index extends Component {
    static defaultProps = {
        curIndex: 0,//当前索引
        onClick() { },
        height: "100rpx",
        tabData: [
            {
                title: "按钮",
                badge: {
                    dot: true,//角标红点
                    value: "2",//角标内容
                },
                customsizeComp: "自定义组件"//暂时不支持
            },
            {
                title: "按钮2",
                badge: {
                    dot: true,//角标红点
                },
                customsizeComp: "自定义组件"//暂时不支持
            },
            {
                title: "按钮3",
                badge: {
                    dot: false,//角标红点
                    value: "2",//角标内容
                },
                customsizeComp: "自定义组件"//暂时不支持
            },
        ],
        className: "",
        style: {}
    }
    render() {
        return (
            <View className={`tabList ${this.props.className}`} style={{
                height: this.props.height,
                ...this.props.style
            }}>
                {this.props.tabData.map((item, i) => {
                    let badgeValue = "";
                    let badgeDot = false;
                    if (item.badge) {
                        badgeValue = item.badge.value;
                        badgeDot = item.badge.dot;
                    }
                    const current = Number(this.props.current);
                    return (
                        <View
                            key={item.title}
                            className={`item ${i === current ? "cur" : ""}`}
                            onClick={() => {
                                this.props.onClick(i, item);
                            }}
                        >
                            <View className="title">
                                {item.title}
                                {badgeDot && <Text className={`dot ${badgeValue ? "" : "dotCircle"}`}>{badgeValue}</Text>}
                            </View>

                        </View>
                    )
                })}
                {/* <View className="item">
                    <View className="title">
                        按钮
                        <Text className="dot dotCircle"></Text>
                    </View>
                </View>
                <View className="item cur">
                    <View className="title">按钮
                    <Text className="dot">1</Text>
                    </View>
                </View>
                <View className="item">
                    <View className="title">按钮</View>
                </View> */}
            </View>
        )
    }
}
