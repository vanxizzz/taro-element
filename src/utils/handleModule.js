import Taro from "@tarojs/taro"
/**
 * 处理未开发模块的事件
 * @param {*} text 
 */
export default (text = "模块未开发") => {
    Taro.showToast({
        title: text,
        icon: "none"
    })
}