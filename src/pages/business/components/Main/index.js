import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import MyIcon from "@/components/common/MyIcon"
import Header from "../Header"
import Nav from "../Nav"
import Layout from "@/components/common/Layout"
import Footer from "../Footer"
import BusinessMenuNav from "../BusinessMenuNav"
import BusinessMenuItemList from "../BusinessMenuItemList"
import Test from "../Test"
import { connect } from "@tarojs/redux"
import Context from "../../businessContext"
import { selectBusinessById } from "@/apis/front/business"
import { selectMenuByBusinessId } from "@/apis/front/menu"
import { reverseGeocoder } from "@/qqmapAPI"
import Loading from "@/components/common/Loading"
import calcDistance from "@/utils/calcDistance"
import { deliverSpeed } from "@/service/apis/constance"
import getParams from "@/utils/getParams"
import deepCompare from '../../../../utils/deepCompare'
class index extends PureComponent {
    static contextType = Context
    static defaultProps = {
        myBusiness: [],//商家数据列表
        onStoreToBusiness(curBusiness) { },
        onIncreaseOrder(info) { },
        onDecreaseOrder(info) { },
        onClearCart(businessId) { },
        fixedSomeComp: false,
        businessId: 0,
        userLocation: { lat: 0, lng: 0 },
        userId: null
    }
    shouldUpdateTag = true //在shouldComponentUpdate会有用
    constructor(props) {
        super(props);
        console.log("Main组件的contructor")
        this.state = {
            lastProps: {
                ...this.props
            },

            curType: null,//当前类目
            // userId: props.userId,
            // fixedSomeComp: this.props.fixedSomeComp,//当页面超过header高度时，设置为true，反之为false
            height: {
                nav: "100rpx",
                header: "400rpx",
                footer: "200rpx"
                // footer: "320.61rpx"
            },
            curCompIndex: 0,
            changeCurType: (type) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        curType: type
                    }
                })
            },
            changeCurCompIndex: (index) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        curCompIndex: Number(index),
                    }
                })
            },
            updateCartModal: (status = false) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        showCartModal: status
                    }
                })
            },
            curBusiness: {},
            increaseOrder: props.onIncreaseOrder,
            decreaseOrder: props.onDecreaseOrder,
            clearCart: async (businessId) => {
                try {
                    const { confirm } = await Taro.showModal({
                        content: "确定清空？？"
                    })
                    if (confirm) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                showCartModal: false
                            }
                        })
                        props.onClearCart(businessId);
                    }
                } catch (error) {

                }
            },
            showLoading: true,//一开始要加载
            showCartModal: false,//展示下边购物车详细
        }
        // props.forceLoading();
        // Taro.login().then(res => {
        //     console.log(res)
        // })
    }
    async componentDidMount() {
        let id = Number(this.props.businessId);
        if (id == null) {
            return;
        }
        const curBusiness = await this.getTargetBusiness({ id, curBusiness: this.props.myBusiness })
        this.setState(prevState => {
            return {
                ...prevState,
                curBusiness,
                showLoading: false
            }
        })
        this.props.onStoreToBusiness && this.props.onStoreToBusiness(curBusiness);
    }
    async componentWillReceiveProps(nextProps) {
        if (!deepCompare(nextProps, this.state.lastProps)) {
            let curBusiness = this.state.curBusiness;
            if (!deepCompare(nextProps.myBusiness, this.state.myBusiness)) {
                const id = nextProps.businessId;
                const businessData = nextProps.myBusiness;
                curBusiness = await this.getTargetBusiness({ id, curBusiness: businessData });
            }
            this.setState(prevState => {
                return {
                    ...prevState,
                    curBusiness,
                    lastProps: { ...nextProps }
                }
            })
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     /* 走到这，说明，lastProps一定是上一次的nextProps了 */
    //     let canUpdate = false;
    //     const { lastProps } = nextState;
    //     // debugger;
    //     // if (!deepCompare(lastProps, nextProps) || this.shouldUpdateTag) {
    //     if (!deepCompare(lastProps, nextProps) || this.shouldUpdateTag) {
    //         /* props不同时 */
    //         // this.shouldUpdateTag = false;
    //         canUpdate = true;
    //     }

    //     return canUpdate;
    // }
    // getSnapshotBeforeUpdate(prevProps,prevState){

    // }
    // async componentDidUpdate(prevProps, prevState) {
    //     const { lastProps } = prevState;
    //     if (!deepCompare(lastProps.myBusiness, prevProps.myBusiness)) {
    //         /* props不同时 */
    //         let id = prevProps.businessId;
    //         let targetBusiness = await this.getTargetBusiness({ id, curBusiness: prevProps.myBusiness });
    //         console.log("不同")
    //         console.log(lastProps, prevProps)
    //         console.log(targetBusiness)
    //         // debugger;
    //         this.shouldUpdateTag = true;
    //         this.setState(prev => {
    //             return {
    //                 ...prev,
    //                 curBusiness: { ...targetBusiness },
    //                 lastProps: { ...prevProps }
    //             }
    //         })
    //     }else {
    //         this.shouldUpdateTag = false;
    //     }
    // }

    async getTargetBusiness({ id, curBusiness = [] }) {
        let targetBusiness;
        let isStoredIndex = curBusiness.findIndex(item => item.businessId === id)
        if (isStoredIndex !== -1) {
            /* 仓库里有 */
            targetBusiness = curBusiness[isStoredIndex];
            // this.setState(prevState => {
            //     const newCurBusiness = curBusiness[isStoredIndex];
            //     return {
            //         ...prevState,
            //         curBusiness: newCurBusiness
            //     }
            // })
        } else {
            const PromiseAll = [selectBusinessById(id), selectMenuByBusinessId(id)];
            const [businessInfo, menuData] = await Promise.all(PromiseAll);
            const { result: { address, formatted_addresses, address_component } } = await reverseGeocoder({
                latitude: businessInfo.location.latitude,
                longitude: businessInfo.location.longitude
            })
            let { id: businessId, ...bInfo } = businessInfo;
            targetBusiness = {
                businessId,
                ...bInfo,
                address: {
                    address,
                    formatted_addresses,
                    address_component
                },
                menuData: [...menuData],
                curCart: {
                    originTotalPrice: 0,//没折扣的总价
                    nowTotalPrice: 0,//折扣后的总价   
                    menuNum: 0,//点的menu数量，就是orderMenu.length
                    orderMenu: []
                }
            };
        }
        // targetBusiness.menuData = targetBusiness.menuData.map((item, i) => {
        //     return {
        //         ...item,
        //         scrollId: `id${i}`//方便点击目录后滚动到对应位置
        //     }
        // })
        const { lat, lng } = this.props.userLocation;
        const distance = calcDistance({ lat, lng }, { lat: targetBusiness.location.latitude, lng: targetBusiness.location.longitude });
        const deliverTime = distance / deliverSpeed;
        targetBusiness = {
            ...targetBusiness,
            deliverTime
        }
        return targetBusiness;
    }

    getComp() {
        const current = this.state.curCompIndex;
        // return <Text>哈哈啊哈</Text>
        let comp;
        // let paddingTop = 0;

        switch (current) {
            case 0: {
                /* 展示商家菜单 */
                /* 坑，得包裹一层Block才会显示 */
                comp = <View className="businessMenu">
                    <View className="left">
                        <BusinessMenuNav />
                    </View>
                    <View className="right">
                        <BusinessMenuItemList />
                    </View>
                </View>
                break;
            }

            case 1: {
                /* 展示评论 */
                break;
            }

            case 2: {
                /* 展示商家信息 */
                break;
            }

        }
        return (
            <Block>
                <View className="mainWrapper" style={{
                    width: "100%",
                    height: `calc(100vh - ${parseFloat(this.state.height.nav) + parseFloat(this.state.height.header) + "rpx"})`
                }}>
                    {comp}
                </View>
            </Block>
        )
    }
    render() {
        // const theState = { ...this.state };
        console.log("main的renderrrrrrrr")
        return (
            <Block>
                <Context.Provider value={{ ...this.state }}>
                    <Loading show={this.state.showLoading} />
                    <View className="wrapper" style={{
                        position: "relative",
                        height: getParams.height + "rpx",
                        paddingTop: getParams.topBarHeight + "rpx",
                        // overflow:"hidden",
                        // maxHeight: "100vh"
                    }} >
                        <Header />
                        <Nav />
                        {this.getComp()}
                        <View className="bottom">
                            <Footer />
                        </View>
                    </View>


                    {/* <Layout
                        // scrollPadding={0}
                        padding={{ bottom: parseFloat(this.state.height.footer) }}
                        scrollBackgroundColor="#fafafa"
                        // scrollHeight={1200 - parseFloat(this.state.height.footer)}
                        renderBottom={() => {
                            return (
                                <Block>
                                    <Footer />
                                </Block>
                            )
                        }}
                        renderChildren={() => {
                            return (
                                <Block>
                                    <View>
                                        <Header />
                                        <Nav />
                                        {this.getComp()}
                                    </View>
                                </Block>
                            )
                        }}
                    /> */}

                </Context.Provider>
            </Block>


        );
    }
}
let mapStateToProps = (state, { myBusiness, userLocation, userId, ...ownProps }) => {
    // let mapStateToProps = (state, ownProps) => {
    /* 巨坑，ownProps里会附带上次的mapStateToProps返回值 */
    console.log("userIdddddddddddd")
    const res = {
        myBusiness: state.business.curBusiness,
        userLocation: state.location.user.location,
        userId: state.user.id,
        ...ownProps
    }
    console.log(res.userId)
    // return ownProps;
    return res;
};
let mapDispatchToProps = (dispatch, ownProps) => ({
    onStoreToBusiness(info) {
        dispatch({ type: "business/createCurBusiness", payload: { ...info } });
    },
    onIncreaseOrder(info) {
        dispatch({ type: "business/increaseOrder", payload: { ...info } });
    },
    onDecreaseOrder(info) {
        dispatch({ type: "business/decreaseOrder", payload: { ...info } });
    },
    onClearCart(businessId) {
        dispatch({ type: "business/clearCart", payload: businessId })
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(index);
