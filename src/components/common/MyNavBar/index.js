import Taro,{ PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MyIcon from "@/components/common/MyIcon"
import './index.scss'
import getLastPage from "@/utils/getLastPage"
import getParams from "@/utils/getParams"
class index extends PureComponent {
    constructor(props) {
        super(props);
        this.assignDefault = {
            onTurnToLastPage: () => {
                const lastPage = getLastPage();
                console.log("点击了")
                console.log(lastPage)
                Taro.redirectTo({
                    url: lastPage
                })
            },
            height: getParams.topBarHeight,
            bgColor: "#02B6FD",
            color: "#fff",
            left: [
                {
                    name: "lastpage",
                    show: true,
                    icon: { value: "leftArrowIcon", color: "#fff" },
                    onClick: () => {
                        console.log("left")
                        this.assignDefault.onTurnToLastPage()
                    }
                    // text: "返回"
                },
                {
                    name: "home",
                    show: true,
                    icon: { value: "homeIcon", color: "#fff" },
                    onClick() {
                        console.log("home")
                        Taro.reLaunch({
                            url: "/pages/index/index"
                        })
                    }
                    // text: "返回"
                },
            ],
            title: "",
            right: {
                // icon: { value: "leftArrowIcon", color: "#fff" },
                text: ""
            },
            ...props,
        }
        let pages = Taro.getCurrentPages();
        let curPageRoute;
        if(pages.length === 0){
            curPageRoute = "pages/index/index"
        }else {
            curPageRoute = pages[pages.length - 1].route;
        }
        
        console.log(pages)
        if (curPageRoute === "pages/index/index") {
            /* 让home按钮和lastpage按钮消失 */
            this.assignDefault = {
                ...this.assignDefault,
                left: this.assignDefault.left.map(item => {
                    if (item.name === "home" || item.name === "lastpage") {
                        return { ...item, show: false }
                    }
                    return { ...item };
                })
            }
        }
        this.assignDefault = {
            ...this.assignDefault,
            curPageRoute
        }
    }
    async componentDidMount() {
        // const { statusBarHeight = 20, ...res } = await Taro.getSystemInfo();

        // this.setState(prevState => {
        //     return {
        //         statusBarHeight
        //     }
        // })
        // console.log("ressssssssss")
        // console.log(res)
    }

    render() {
        const { left = {}, right = {}, title, height, bgColor, color } = this.assignDefault;
        return (
            <View className="navBar" style={{
                height: height + "rpx",
                // paddingTop: getParams.capsuleTop + "rpx",
                // paddingBottom: getParams.capsuleBottom + "rpx",
                backgroundColor: bgColor,
                color,
                // fontSize:"24rpx"
            }}>
                <View className="wrapper" style={{
                    // height: `${height - this.state.statusBarHeight * 2}rpx`,
                    top: getParams.capsuleTop + "rpx",
                    // paddingBottom: getParams.capsuleBottom + "rpx",
                }}>
                    <View className="left" onClick={() => {
                        this.assignDefault.onTurnToLastPage && this.assignDefault.onTurnToLastPage();
                    }}>
                        <View className="leftWrapper">
                            {left.map(item => {
                                return (
                                    <Block>
                                        {item.show &&
                                            <View className="item" key={item.name}>
                                                <MyIcon className="icon" {...item.icon} style={{
                                                    fontSize: "50rpx"
                                                }}
                                                    onClick={item.onClick}
                                                />
                                                {item.text && <Text className="word">{item.text}</Text>}
                                            </View>
                                        }
                                    </Block>

                                )
                            })}
                        </View>

                    </View>
                    <View className="title">
                        {title}
                    </View>
                    <View className="right">
                        {right.icon && <MyIcon {...left.icon} />}
                        <Text>{right.text}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default index;