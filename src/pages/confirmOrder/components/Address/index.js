import Taro, { Component } from '@tarojs/taro'
import MyIcon from "@/components/common/MyIcon"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import Context from "../../context"
import AddressItem from "@/components/common/AddressItem"
import { createCommunication, removeCommunicationByTargetUrl } from "@/pageCommunication"
export default class index extends Component {
    static contextType = Context
    static defaultProps = {
        address: null,
    }
    constructor(props) {
        super(props);

    }
    /* 获取地址项数据 */
    getInfoObj() {
        if (!this.context.curAddress) {
            return;
        }
        return { ...this.context.curAddress };

    }
    /* 没有选择地址，得跳转到地址页 */
    turnToAddressPage() {
        /* 创建和address页面的联系 */
        console.log("创建联系")
        console.log(this.context.router)
        createCommunication({
            origin: {
                path: this.context.router.path,
                params: this.context.router.params
            },
            target: {
                path: "/pages/address/index",
            },
            info: "selectAddress"
        })
        Taro.navigateTo({
            url: `/pages/address/index`,
        })
    }
    render() {
        const { curAddress } = this.context;
        console.log(curAddress)
        return (
            <View className="addressWrapper">
                <Block>
                    {!curAddress ?
                        <View className="changeAddress" onClick={this.turnToAddressPage}>
                            <Text className="word">选择收获地址</Text>
                            <MyIcon value="rightArrowIcon" />
                        </View>
                        :
                        <View className="showAddress">
                            <AddressItem onItemClick={() => {
                                this.turnToAddressPage();
                            }} infoObj={curAddress} />
                        </View>
                    }
                </Block>
            </View>
        )
    }
}
