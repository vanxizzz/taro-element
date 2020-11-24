import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import MyIcon from "@/components/common/MyIcon"
import Header from "./components/Header"
import MallNav from "./components/MallNav"
import OrderRemind from "@/components/common/OrderRemind"
import Banner from "./components/Banner"
import RecommendBusiness from "./components/RecommendBusiness"
import Layout from "@/components/common/Layout"
// import LoadingWrapper from "@/components/common/LoadingWrapper"
import AddressItem from "@/components/common/AddressItem"
import AddressList from "@/components/common/AddressList"
import { connect } from "@tarojs/redux"

class index extends Component {
    static defaultProps = {
        lastPage: null
    }
    // lastPage = null
    constructor(props) {
        super(props);
    }
    onEditClick({ type, id }) {
        console.log()
        Taro.redirectTo({
            url: `/pages/editAddress/index?id=${id}&type=${type}`
        })
    }
    
    handleEditClick(id) {
        this.onEditClick({ type: "update", id })
    }
    handleItemClick(id) {
        console.log(`${this.props.lastPage}?addressId=${id}`)
        const lastPage = this.props.lastPage;
        if (lastPage) {
            /* 把id传给上一个页面 */
            Taro.redirectTo({
                url: `${lastPage.path}?addressId=${id}&businessId=${lastPage.params.businessId}`
            })
        } else {
            this.onEditClick({ type: "update", id })
        }
    }
    render() {
        // console.log("this.props.addressDataddddddddddddddddd")
        // console.log(this.props.addressData)
        return (
            <Block>
                <Layout
                    // scrollPadding={0}
                    padding={{bottom: 220}}
                    scrollBackgroundColor="#fafafa"
                    scrollHeight={1600 - 220}
                    renderChildren={() => {
                        return (
                            <Block>
                                <AddressList
                                    addressData={[...this.props.addressData]}
                                    onItemClick={({ id }) => {
                                        this.handleItemClick(id);
                                    }}
                                    onEditClick={({ id }) => {
                                        this.onEditClick({ id, type: "update" })
                                    }}
                                />
                            </Block>
                        )
                    }}
                    renderBottom={() => {
                        return (
                            <View onClick={() => {
                                this.onEditClick({ type: "create" })
                            }} className="bottomWrapper" style="height:100rpx;">
                                <MyIcon value="addIcon" size={40} />
                                <Text className="word">
                                    新增地址
                            </Text>
                            </View>
                        )
                    }}
                >
                </Layout>
            </Block>



        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    addressData: state.user.address,
    ...ownProps
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
