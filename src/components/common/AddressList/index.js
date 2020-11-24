import  { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import AddressItem from "../AddressItem"
// import { connect } from "@tarojs/redux"
import './index.scss'
class index extends Component {
    static defaultProps = {
        addressData: [],
        onEditClick() { },
        onItemClick() { },
    }
    render() {
        return (
            <View className="businessList">
                {
                    this.props.addressData.length <= 0
                        ?
                        <AtDivider content="暂无地址，请点击下方添加吧~" fontColor="#02B6FD" lineColor='#CDCDCD' />
                        :
                        this.props.addressData.map(item => {
                            return (
                                <AddressItem key={item.id} onItemClick={this.props.onItemClick} onEditClick={this.props.onEditClick} infoObj={item} key={item.id} />
                            )
                        })
                }
            </View>
        );
    }
}
export default index;



