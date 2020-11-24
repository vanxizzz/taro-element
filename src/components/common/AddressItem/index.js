import  { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MyIcon from "../MyIcon"
import './index.scss'
class index extends Component {
    static defaultProps = {
        infoObj: {},
        onEditClick() { },
        onItemClick() { }
    }
    render() {
        const { name, sex, phone, tag, fullName: address, isDefault } = this.props.infoObj
        let tagName;
        switch (tag) {
            case "company":
                tagName = "公司"
                break;

            case "school":
                tagName = "学校"
                break;

            case "home":
                tagName = "家"
                break;

            default:
                break;
        }
        return (
            <View className="addressItem" onClick={() => {
                this.props.onItemClick({ ...this.props.infoObj })
            }}>
                <View className="left">
                    <View className="item top">
                        <View className="name">{name}</View>
                        {/* <View className="sex">{sex ? "先生" : "女士"}</View> */}
                        <View className="sex">{sex ? "先生" : "女士"}</View>
                        <View className="phone">{phone}</View>
                        {isDefault && <View className="default">
                            默认
                        </View>}
                    </View>
                    <View className="item">
                        <View className={`tag tag-${tag}`}>{tagName}</View>
                        <View className="address">{address}</View>
                    </View>
                </View>
                <View className="right" >
                    <MyIcon onClick={() => {
                        this.props.onEditClick({ ...this.props.infoObj });
                    }} value="editIcon" size={30} />
                </View>
            </View>
        );
    }
}

export default index;