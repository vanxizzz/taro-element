import { Component } from '@tarojs/taro'
import { View, Text, Block } from "@tarojs/components"
import MyIcon from "@/components/common/MyIcon"
import "./index.scss"
class FlexItem extends Component {
    static defaultProps = {
        data: [
            // {
            //     title: "红包",
            //     icon: {//参考MyIcon
            //         value: "addIcon"
            //     },
            //     renderMyComp: false,//一个函数，返回组件，有bug，不支持该属性
            //     iconLocation: "left",//在文字的左边，可以传left，right
            //     onMyClick() {
            //         console.log("left00")
            //     },
            //     style: {}
            // }
        ],
        wrapperStyle: {}
    }
    renderComp(itemValue) {
        let fn = itemValue.onMyClick;
        console.log(fn)
        return (
            <Block>
                {/* <View className="item" onClick={() => {
                    // this.handleClick.bind(this, itemValue.onClick)
                    // console.log(itemValue.onClick)
                    // console.log(itemValue)
                    itemValue.onClick && itemValue.onClick()
                }}> */}


            </Block>
        )
    }
    handleClick(click) {
        console.log(click)
        click && click()
        // console.log(onClick)
        // console.log(onClick)
        // onClick && onClick()
    }
    render() {
        console.log("^^^^^^^^^^^^^^^^^^")
        return (
            <View className="flexItemWrapper" style={{ ...this.props.wrapperStyle }}>
                {this.props.data.map(itemValue => {
                    // return <Block>{this.renderComp(item)}</Block>;
                    return <View key={itemValue.title} className="item" onClick={() => {
                        itemValue.onMyClick && itemValue.onMyClick()
                    }}>
                        {itemValue.renderMyComp
                            ?
                            <Block>{itemValue.renderMyComp()}</Block>
                            :
                            (
                                itemValue.iconLocation === "left"
                                    ?
                                    <View className="content" style={itemValue.style}>
                                        {itemValue.icon && <MyIcon {...itemValue.icon} />}
                                        <Text className="title">{itemValue.title}</Text>
                                    </View>
                                    :
                                    <View className="content" style={itemValue.style}>
                                        <Text className="title">{itemValue.title}</Text>
                                        {itemValue.icon && <MyIcon {...itemValue.icon} />}
                                    </View>
                            )
                        }
                    </View>
                })}
                {/* <Block>
                    {this.props.left && this.getItem(this.props.left, "left")}
                </Block>
                <Block>
                    {this.props.right && this.getItem(this.props.right, "right")}
                </Block> */}
            </View>
        );
    }
}

export default FlexItem;