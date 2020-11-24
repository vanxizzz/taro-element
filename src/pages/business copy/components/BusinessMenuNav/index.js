import Taro, { Component } from '@tarojs/taro'
import "./index.scss"
import { ScrollView, View, Text } from "@tarojs/components"
import MyIcon from "@/components/common/MyIcon"
import { connect } from "@tarojs/redux"
import Context from "../../businessContext"
import getParams from "@/utils/getParams"
export default class index extends Component {
    static contextType = Context
    navData = [
        {
            nav: {
                title: "热销",
                icon: "addIcon",
            },
            item: [
                // {
                //     businessId: 123,
                //     name: `菜品名`,//菜品名
                //     type: {
                //         text: `菜品类型${i}`,
                //     },//菜品类型
                //     originPrice: ranNumFn(30, 40),//原价
                //     nowPrice: ranNumFn(10, 20),//现价
                //     saleNum: ranNumFn(100, 200),//销量
                //     img: logoSrc,
                //     shortIntroduction: Random.cword(5, 10)//菜品介绍
                // }
            ]
        }
    ]
    render() {
        let curBusiness = this.context.curBusiness
        let menuData;
        if (!curBusiness) {
            menuData = [];
        } else {
            menuData = curBusiness.menuData ? curBusiness.menuData : []
        }
        let style = {
            height: `calc(100% - ${this.context.height.footer})`
        };
        if (this.context.fixedSomeComp) {
            style = {
                width: "200rpx",
                position: "fixed",
                top: parseFloat(this.context.height.nav) + getParams.topBarHeight + "rpx",
                height: `calc(100% - ${this.context.height.footer})`,
                // paddingBottom: this.context.height.footer,
                // boxSizing:"border-box",
                left: 0,
                zIndex: 4,
                backgroundColor: "#fff",
            }
        }
        return (
            <View className="menuNav">
                <ScrollView scrollY style={{
                    height: "100%",
                    ...style
                }}>
                    <View className="menuNavWrapper">
                        {menuData.map((item, i) => {
                            return (
                                <View
                                    key={item.type.text}
                                    className={`menuNavItem ${this.context.curType === "scrollId" + i ? "cur" : ""}`}
                                    onClick={() => {
                                        this.context.changeCurType(`scrollId${i}`)
                                    }}

                                >
                                    {item.type.icon && <MyIcon {...item.type.icon} />}
                                    <Text className="navName">{item.type.text}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
