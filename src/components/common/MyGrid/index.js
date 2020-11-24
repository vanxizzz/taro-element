import  { Component } from '@tarojs/taro'
import { View,  Image } from '@tarojs/components'
import './index.scss'
class index extends Component {
    static defaultProps = {
        data: [
            // {
            //     image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            //     value: '美食'
            // },
        ],
        mode: "square",
        hasBorder: true,
        columnNum: 3,
        imageSize: "35px"
    }
    getItemStyle() {
        let style = {};
        if (this.props.mode === "rect") {
            style.display = "flex";
            style.alignItems = "center";
            style.justifyContent = "center";
        }
        if (this.props.hasBorder) {
            style.border = "1px solid #f9f9f9";
        }
        if (this.props.columnNum) {
            style.width = 100 / this.props.columnNum + "%";
        }
        return style;
    }
    getTitleStyle() {
        let style = {};
        if (this.props.mode === "rect") {
            style.marginLeft = "10rpx";
        } else {
            style.margin = "10rpx 0";
        }
        return style;

    }
    getImageStyle() {
        let style = {};
        style.width = this.props.imageSize;
        style.height = this.props.imageSize;
        return style;

    }

    render() {
        return (
            <View className="myGrid">
                {this.props.data.map((item, i) => {
                    return (
                        <View
                        key={item.id}
                            onClick={(e) => {
                                this.props.onClick && this.props.onClick(item, i, e);
                            }}
                            className="item"
                            style={{
                                ...this.getItemStyle()
                            }}>
                            <View className="item_img">
                                <Image src={item.image} style={{
                                    ...this.getImageStyle()
                                }} />
                            </View>
                            <View className="item_title" style={{
                                ...this.getTitleStyle()
                            }}>
                                {item.value}
                            </View>
                        </View>
                    )
                })}
            </View>
        );
    }
}

export default index;