import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { AtActivityIndicator } from "taro-ui"
import MyTagGroup from "@/components/common/MyTagGroup"
import BusinessList from "@/components/common/BusinessList"
import './index.scss'
import MyIcon from "@/components/common/MyIcon"
import handleModule from "@/utils/handleModule"
import businessAPI from "@/apis/front/business"
import Layout from "@/components/common/Layout"
import { connect } from "@tarojs/redux"
import Loading from "@/components/common/Loading"
import getParams from "@/utils/getParams"
import deepClone from "@/utils/deepClone"
class index extends PureComponent {
    // static defaultProps = {
    //     businessData: []
    // }

    state = {
        isInputing: true,
        noData: false,//数据库没数据了
        filterCondition: {
            page: 1,
            limit: 10,
            condition: "distance",
            keywords: ""
        },
        location: { latitude: null, longitude: null },
        data: [],
        showLoading: false,
        showNavChildren: false,
        navConfig: [
            {
                id: 0,
                text: "综合排序",
                condition: "distance",
                icon: { value: "bottomArrowIcon" },
                isCur: true,
                children: [
                    {
                        id: 0,
                        condition: "distance",
                        text: "综合排序",
                        isCur: true
                    },
                    {
                        id: 1,
                        condition: "mark",
                        text: "好评优先",
                        isCur: false
                    },
                    {
                        id: 2,
                        condition: "lowestPrice",
                        text: "起送价最低",
                        isCur: false
                    },
                ]
            },
            {
                id: 1,
                text: "距离最近",
                condition: "distance",
                isCur: false,
            },
            {
                id: 2,
                text: "销量最高",
                condition: "sellPerMonth",
                isCur: false,
            }
        ],
    }
    async componentDidMount() {
        // await businessAPI.
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         showLoading: true
        //     }
        // })
        // await this.onReachBottom();
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         showLoading: false
        //     }
        // })
    }
    async onReachBottom({ page, limit } = {}) {
        try {
            if (this.state.showLoading) {
                return;
            }
            // this.setState(prevState => {
            //     return {
            //         ...prevState,
            //         showLoading: true
            //     }
            // })
            let { latitude, longitude } = this.state.location;
            if (!latitude || !longitude) {
                let location = await Taro.getLocation();
                latitude = location.latitude;
                longitude = location.longitude;
                this.setState(prevState => {
                    return {
                        ...prevState,
                        location: { latitude, longitude }
                    }
                })
            }
            let tempPage = !page ? this.state.filterCondition.page : page;
            const res = await businessAPI.selectSomeBusinessByCondition({
                condition: this.state.filterCondition.condition,
                longitude,
                latitude,
                page:tempPage,
                limit: !limit ? this.state.filterCondition.limit : limit,
                keywords: this.state.filterCondition.keywords
            });
            /* 加一页 */
            console.log(res);
            let noData = false;
            if (res.length === 0) {
                noData = true;
            }
            // this.state.businessInfo.updateFilterCondition({ page: +this.state.businessInfo.filterCondition.page + 1 });
            this.setState(prevState => {
                const newState = ({
                    ...prevState,
                    noData,
                    filterCondition: {
                        ...prevState.filterCondition,
                        page: tempPage + 1
                    },
                    data: [
                        ...prevState.data,
                        ...res
                    ],
                });
                console.log("newStateeeeeeeeeeeeeeeeee")
                console.log(newState)
                return newState
            })
        } catch (error) {
            console.log("error");
            console.log(error)
        }


    }
    /**
     * parentId是navConfig每一项的id
     * childrenId是navConfig每一项的children的里的每一项的id
     *
     * @param {*} {parentId,childrenId}
     */
    getNewNavConfig({ parentId, childrenId }) {
        let cloneNavConfig = deepClone(this.state.navConfig);
        let targetParentIndex = cloneNavConfig.findIndex(item => item.id === parentId);
        let newConfig = cloneNavConfig;
        /* 处理父导航的cur */
        newConfig = newConfig.map((item, index) => {
            if (index === targetParentIndex) {
                return { ...item, isCur: true }
            } else {
                return { ...item, isCur: false }
            }
        })
        /* 处理所有children的cur为false */
        if (newConfig[targetParentIndex].id !== 0) {
            newConfig = newConfig.map(item => {
                if (item.children) {
                    return {
                        ...item,
                        children: item.children.map(it => ({ ...it, isCur: false }))
                    }
                }
                return item;
            })
        }
        if (childrenId != undefined) {
            /* 处理子导航的cur */
            let targetChildrenIndex = newConfig[targetParentIndex].children.findIndex(it => it.id === childrenId);
            let newChildren = newConfig[targetParentIndex].children.map((item, index) => {
                if (index === targetChildrenIndex) {
                    return { ...item, isCur: true }
                }
                return { ...item, isCur: false }
            })
            newConfig[targetParentIndex] = {
                ...newConfig[targetParentIndex],
                text: newConfig[targetParentIndex].children[targetChildrenIndex].text,
                condition: newConfig[targetParentIndex].children[targetChildrenIndex].condition,
                children: newChildren,
                isCur: true
            }
        }
        console.log("newConfig")
        console.log(newConfig)
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         showNavChildren: false,
        //         navConfig: newConfig
        //     }
        // })
        // this.setState({
        //     ...this.state,
        //     showNavChildren: false,
        //     navConfig: newConfig
        // })
        return newConfig;
    }
    async handleNavClick(item) {
        let newState = deepClone(this.state);
        let newCondition;
        if (!item.children) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    showLoading: true
                }
            })
            let { latitude, longitude } = this.state.location;
            newState.filterCondition = {
                ...newState.filterCondition,
                page: 1,
                limit: 10,
                condition: item.condition
            }
            console.log("deepClone(newState.filterCondition)");
            console.log(deepClone({ ...newState.filterCondition, latitude, longitude }));
            const newData = await businessAPI.selectSomeBusinessByCondition({
                latitude,
                longitude,
                condition: item.condition,
                page: newState.filterCondition.page,
                limit: newState.filterCondition.limit,
                keywords: newState.filterCondition.keywords
            });
            if (newData.length === 0) {
                newState.noData = true;
            } else {
                newState.noData = false;
            }
            newState.filterCondition.page++;
            newState.data = newData;
            newState.showLoading = false;
        }
        if (item.id !== 0) {
            newState.showNavChildren = false;
        } else {
            newState.showNavChildren = !newState.showNavChildren;
        }
        let newConfig = this.getNewNavConfig({ parentId: item.id })
        this.setState(prevState => {
            return {
                ...newState,
                navConfig: newConfig,
            }
        })
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         navConfig: newConfig
        //     }
        // });
    }
    getNavComp() {
        const curNav = this.state.navConfig.find(item => item.isCur);
        return (
            <View className="navWrapper">

                <View className="navList">
                    {this.state.navConfig.map(item => {
                        return (
                            <View
                                className={`item ${item.isCur ? "cur" : ""}`}
                                key={item.id}
                                onClick={() => {
                                    console.log("测试")
                                    console.log(item)
                                    this.handleNavClick(item);
                                }}
                            >
                                <Text className="word">{item.text}</Text>
                                {item.icon && <MyIcon {...item.icon} />}
                            </View>
                        )
                    })}
                </View>
                {(this.state.showNavChildren && curNav.children)
                    &&
                    <View className="navChildren">
                        {curNav.children.map(item => {
                            return (
                                <View
                                    className={`navChildrenItem ${item.isCur ? "cur" : ""}`}
                                    key={item.id}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        this.setState(prevState => {
                                            return { ...prevState, showLoading: true }
                                        })
                                        let newConfig = this.getNewNavConfig({ parentId: curNav.id, childrenId: item.id })
                                        const { latitude, longitude } = this.state.location
                                        const newData = await businessAPI.selectSomeBusinessByCondition({
                                            latitude,
                                            longitude,
                                            condition: item.condition,
                                            page: 1,
                                            limit: 10,
                                            keywords: this.state.filterCondition.keywords
                                        });
                                        let noData = false;
                                        if (newData.length === 0) {
                                            noData = true;
                                        }
                                        this.setState(prevState => {
                                            return {
                                                ...prevState,
                                                noData,
                                                filterCondition: {
                                                    ...prevState.filterCondition,
                                                    page: 2,
                                                    limit: 10,
                                                    condition: item.condition
                                                },
                                                navConfig: newConfig,
                                                data: newData,
                                                showNavChildren: false,
                                                showLoading: false
                                            }
                                        })
                                    }}
                                >
                                    <View className="left">{item.text}</View>
                                    <View className="right">
                                        {item.isCur && <MyIcon value="tickIcon" />}
                                    </View>
                                </View>
                            )
                        })}
                        {/* <View className="navChildrenItem">
                            <View className="left">综合排序</View>
                            <View className="right"><MyIcon color={"#000"} value="tickIcon" /></View>
                        </View>
                        <View className="navChildrenItem cur">
                            <View className="left">综合排序</View>
                            <View className="right"><MyIcon color={"#02B6FD"} value="tickIcon" /></View>
                        </View>
                        <View className="navChildrenItem">
                            <View className="left">综合排序</View>
                            <View className="right"><MyIcon color={"#000"} value="tickIcon" /></View>
                        </View> */}
                    </View>
                }
            </View>
        )
    }
    turnToBusinessPage(item, type) {
        if (type === "more") {
            /* 点击到了item的右上角... */
        } else if (type === "item") {
            /* 点击到了item */
            console.log("urlllll：", `/pages/business/index?id=${item.id}`)
            Taro.navigateTo({
                url: `/pages/business/index?id=${item.id}`
            })
        }
    }
    render() {
        return (
            <Block>
                <Loading show={this.state.showLoading} />
                <View className="wrapper" style={{
                    paddingTop: getParams.topBarHeight + "rpx",
                    overflow: "hidden",
                    maxHeight: "100vh"
                }}>
                    <View className="searchBar">
                        <View className="searchBarWrapper">
                            <MyIcon className="icon" value="searchIcon" />
                            <Input className="input" value={this.state.filterCondition.keywords} onInput={(e) => {
                                this.setState(prevState => {
                                    return {
                                        ...prevState,
                                        isInputing: true,
                                        filterCondition: {
                                            ...prevState.filterCondition,
                                            keywords: e.detail.value
                                        }
                                    }
                                })
                            }} />
                        </View>
                    </View>
                    {this.state.isInputing ?
                        <View className="searchResultWrapper" onClick={() => {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    data: [],
                                    isInputing: false
                                }
                            })
                            this.onReachBottom({ page: 1 });
                        }}>
                            <MyIcon className="icon" value="searchIcon" />
                            <View className="word">查找"{this.state.filterCondition.keywords.length > 15 ? this.state.filterCondition.keywords.substr(0, 15) + "..." : this.state.filterCondition.keywords}"</View>
                        </View>
                        :
                        <View className="maskWrapper">
                            {this.state.showNavChildren && <View className="mask" />}
                            <Block>{this.getNavComp()}</Block>
                            <Layout
                                padding={{ left: 20, right: 20, bottom: 0, forceTop: 0, }}
                                scrollHeight={getParams.height - 80 - 105}//80是navComp的高度，105是最上边搜索框高度
                                needOnReachBottom
                                onReachBottom={() => {
                                    this.onReachBottom()
                                }}
                                renderChildren={() => {
                                    return (
                                        <Block>
                                            <View className="recommendBusiness">
                                                <BusinessList onClick={(item, type) => {
                                                    this.turnToBusinessPage(item, type)
                                                }} data={[...this.state.data]} />
                                            </View>
                                            {/* <View className="loadingWrapper" style={{
                                        position: "relative",
                                        // left: 0,
                                        // top: 0
                                        marginTop: "30rpx"
                                    }}> */}
                                            {
                                                this.state.noData
                                                    ?
                                                    <View className="noData">没有数据咯~</View>
                                                    : <View className="loadingWrapper" style="position:relative;margin-top:30rpx;">
                                                        <AtActivityIndicator mode='center' ></AtActivityIndicator>
                                                    </View>

                                            }



                                        </Block>
                                    )
                                }}
                            />
                        </View>
                    }
                </View>
                {/* topBarHeight */}


            </Block>
        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    name: state.user.name,
    age: state.user.age
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    onIncrease() {

    },
    onDecrease() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);