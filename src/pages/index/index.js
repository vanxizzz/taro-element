import Taro, { PureComponent } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import './index.scss'
import Header from "./components/Header"
import MallNav from "./components/MallNav"
import OrderRemind from "../../components/common/OrderRemind"
import Banner from "./components/Banner"
import RecommendBusiness from "./components/RecommendBusiness"
import Layout from "../../components/common/Layout"
import FooterNav from "@/components/common/FooterNav"
import businessContext from "./context"
import businessAPI from "@/apis/front/business"
import MyNavBar from "@/components/common/MyNavBar"
import getLastPage from "@/utils/getLastPage"
class index extends PureComponent {
    static contextType = businessContext
    config = {
        navigationBarTitleText: '饿了么',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    state = {
        businessInfo: {
            filterCondition: {
                page: 1,
                limit: 5,
                condition: "distance"
            },
            isFetching: false,
            businessData: [],
            onReachBottom: async ({ page, limit } = {}) => {
                try {
                    if (this.state.businessInfo.isFetching) {
                        return;
                    }
                    this.state.businessInfo.setFetching(true);
                    const { latitude, longitude } = await Taro.getLocation();

                    const res = await businessAPI.selectSomeBusinessByCondition({
                        condition: this.state.businessInfo.filterCondition.condition,
                        longitude,
                        latitude,
                        page: !page ? this.state.businessInfo.filterCondition.page : page,
                        limit: !limit ? this.state.businessInfo.filterCondition.limit : limit
                    });
                    /* 加一页 */
                    console.log(res)

                    // this.state.businessInfo.updateFilterCondition({ page: +this.state.businessInfo.filterCondition.page + 1 });
                    this.setState(prevState => {
                        const newState = ({
                            ...prevState,
                            businessInfo: {
                                ...prevState.businessInfo,
                                filterCondition: {
                                    ...prevState.businessInfo.filterCondition,
                                    page: +prevState.businessInfo.filterCondition.page + 1
                                },
                                businessData: [...prevState.businessInfo.businessData, ...res],
                                isFetching: false
                            }
                        });
                        console.log("newStateeeeeeeeeeeeeeeeee")
                        console.log(newState)
                        return newState
                    })
                } catch (error) {
                    console.log("error");
                    console.log(error)
                }


            },
            updateFilterCondition: (obj) => {
                console.log("updateFilterConditionnnnnnnnn")
                console.log(obj)
                this.setState(prevState => {
                    return {
                        ...prevState,
                        businessInfo: {
                            ...prevState.businessInfo,
                            filterCondition: {
                                ...prevState.businessInfo.filterCondition,
                                ...obj
                            }
                        },
                    }
                })
            },
            setFetching: (status) => {
                this.setState(prevState => ({
                    ...this.state,
                    businessInfo: {
                        ...this.state.businessInfo,
                        isFetching: status
                    }
                }))
            }
        }

    }
    componentDidMount() {
        let a = getLastPage();
        console.log(Taro.getCurrentPages())
        console.log("aaaaaaaaaaaaaaaaaaa")
        console.log(a)
        this.state.businessInfo.onReachBottom();
    }
    handleClick() {
        console.log("测试")
    }
    render() {
        return (
            <businessContext.Provider value={this.state.businessInfo}>
                <View style={{
                    overflowY: "hidden"
                }} >
                    <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                    <Layout
                        padding={{ bottom: 170,top:20,left:20,right:20}}
                        // scrollHeight={1100}
                        needOnReachBottom
                        onReachBottom={this.state.businessInfo.onReachBottom}
                        renderBottom={() => {
                            return <FooterNav current={0} />
                        }}
                        renderChildren={() => {
                            return (
                                <Block>
                                    <Header />
                                    <MallNav />
                                    <OrderRemind />
                                    <Banner />
                                    <RecommendBusiness />
                                </Block>
                            )
                        }}
                    >
                    </Layout>

                </View>
            </businessContext.Provider>



        );
    }
}
export default index;
