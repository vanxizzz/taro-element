import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import store from "./store"
import { Provider } from '@tarojs/redux'
import coverToFixed from "./utils/coverToFixed"
import getParams, { changeCapsuleBottom,changeTopBarHeight,changeCapsuleTop,changeCapsuleHeight, changeStatusBarHeight, changeRatio, changeHeight } from "./utils/getParams"
import "./globalCss/index.scss"

coverToFixed();
const res = Taro.getSystemInfoSync();
const capsule = Taro.getMenuButtonBoundingClientRect();
let clientHeight = res.windowHeight;
// 获取可使用窗口高度
let clientWidth = res.windowWidth;
let statusBarHeight = res.statusBarHeight
// 算出比例
let ratio = 750 / clientWidth;
// 算出高度(单位rpx)
let height = clientHeight * ratio;
// 设置高度
console.log("一堆参数")
console.log(`statusBarHeight：${statusBarHeight} , ${statusBarHeight*ratio}`)
console.log(`capsuleTop: ${capsule.top}，${capsule.top*ratio}`)
console.log(`capsuleHeight: ${capsule.height}，${capsule.height*ratio}`)
console.log(ratio);
console.log(height - getParams.topBarHeight);
console.log(capsule)
console.log(statusBarHeight * ratio + capsule.height * ratio + capsule.top*ratio)
changeStatusBarHeight(statusBarHeight * ratio);
changeRatio(ratio);
changeCapsuleTop(capsule.top*ratio)
// changeCapsuleBottom(capsule.bottom*ratio)
changeCapsuleBottom(30)
changeCapsuleHeight(capsule.height*ratio);
// changeTopBarHeight(capsule.height * ratio + capsule.top*ratio + 10);
// changeTopBarHeight(capsule.height * ratio + capsule.top*ratio + capsule.bottom*ratio);
changeTopBarHeight(capsule.height * ratio + statusBarHeight*ratio + getParams.capsuleBottom);
changeHeight(height - getParams.topBarHeight);

let tempStore = { ...store };//如果不这样做会报错
console.log(tempStore)
class App extends Component {

  config = {
    pages: [
      'pages/loadSrc/index',
      'pages/index/index',
      'pages/meishi/index',
      'pages/search/index',
      'pages/order/index',
      'pages/business/index',
      'pages/confirmOrder/index',
      "pages/orderDetail/index",
      'pages/address/index',
      'pages/editAddress/index',
      'pages/own/index',
      'pages/phoneLogin/index',
      'pages/login/index',
      'pages/test/index',
    ],
    permission: {
      "scope.userLocation": {
        desc: "获取您的位置信息"
      }
    },
    // "subpackages": [
    //   {
    //     "root": 'pages/index',
    //     "name": "pages/index",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/order",
    //     "name": "pages/order",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/business",
    //     "name": "pages/business",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/confirmOrder",
    //     "name": "pages/confirmOrder",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/orderDetail",
    //     "name": "pages/orderDetail",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/address",
    //     "name": "pages/address",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/editAddress",
    //     "name": "pages/editAddress",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/own",
    //     "name": "pages/own",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/phoneLogin",
    //     "name": "pages/phoneLogin",
    //     "pages": [
    //       "index"
    //     ]
    //   },
    //   {
    //     "root": "pages/login",
    //     "name": "pages/login",
    //     "pages": [
    //       "index"
    //     ]
    //   },

    // ]
  }

  componentDidMount() {
    // initData()
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  render() {
    return (<Provider store={tempStore}>
      <Block>
        <Index />
      </Block>
    </Provider>);
  }
}

Taro.render(<App />, document.getElementById('app'))
