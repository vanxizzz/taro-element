import addressAPI from "../apis/front/address"
import { loginOneUserInfo } from "../apis/front/user"
import avatar from "../assets/imgs/avatar/6.png"
import Taro from "@tarojs/taro"
export default {
    namespace: 'user',/* 命名空间 */
    state: {
        // id: 998,//userId
        // id: 1,//userId
        // phone: "15976877763",//电话
        // avatar: avatar,//头像图片
        // name: "小赵",//昵称
        // shortIntroduction: "我好帅22",//简介
        address: [//收获地址
            {
                id: 1,
                fullName: "广东省深圳市宝安区松岗街道宝利豪庭金兰苑10C",
                province: "广东省",
                city: "深圳市",
                county: "宝安区",
                detailAddress: "宝利豪庭金兰苑10C",
                name: "赵",
                sex: 0,//0男1女
                phone: "15976877763",
                tag: "company",
                userId: 998,
                isDefault: false
            },
            {
                id: 2,
                fullName: "广东省深圳市宝安区松岗街道前进公社2301",
                province: "广东省",
                city: "深圳市",
                county: "宝安区",
                detailAddress: "松岗街道前进公社2301",
                name: "赵赵赵",
                sex: 1,//1男0女
                phone: "15976877763",
                tag: "home",
                userId: 998,
                isDefault: true
            },

        ],

    },/* state仓库 */
    reducers: {
        login(state, { payload }) {
            return { ...payload }
        },
        updateAvatar(state, { payload }) {
            return {
                ...state,
                avatar: payload
            }
        },
        setAddress(state, { payload: { type, info } }) {
            let data = null;
            if (type === "update") {
                data = state.address.map(item => {
                    if (item.id === info.id) {
                        return { ...info };
                    }
                    return { ...item }
                })
            } else if (type === "create") {
                data = [...state.address, { ...info }];
            } else if (type === "delete") {
                /* data是id */
                data = state.address.filter(item => +item.id !== +info);
            } else if (type === "setDefault") {
                /* data是id */
                data = state.address.map(item => {
                    let isDefault = item.id === info ? true : false;
                    return {
                        ...item,
                        isDefault
                    }
                });

            }
            const res = { ...state, address: data };
            return res;
        },
    },
    effects: {
        /**
         * type是wechat或phone，前者不用验证码
         *
         * @param {*} { payload: { type, phone, code } }
         * @param {*} { call, put, select }
         */
        *asyncLogin({ payload: { type, phone, code, redirectUrl, ...props } }, { call, put, select }) {
            console.log(type, phone, redirectUrl)
            const res = yield call(loginOneUserInfo, { phone, type, identifyCode: code, ...props });
            yield put({ type: "login", payload: res });
            // Taro.redirectTo({
            //     url: redirectUrl
            // })
            Taro.redirectTo({
                url: redirectUrl
            })
        },
        /**
         *payload = {
             type: "create"或"delete"或"update"或"setDefault"
             info: {数据}
         }
         *
         * @param {*} { payload: { type, obj } }
         * @param {*} { call, put, select }
         */
        *asyncSetAddress({ payload: { type, info, redirectUrl } }, { call, put, select }) {
            console.log(type, info)
            console.log("哈哈哈哈哈")
            let newData = null;
            if (type === "create") {
                newData = yield call(addressAPI.createUserAddress, info);
                if (newData.isDefault === true) {
                    //顺便设置为默认值
                    yield put({ type: "setAddress", payload: { type: "setDefault", info: newData.id } })
                }
            } else if (type === "update") {
                if (info.isDefault === true) {
                    //设置为默认值
                    yield put({ type: "setAddress", payload: { type: "setDefault", info: info.id } })
                }
                newData = yield call(addressAPI.updateUserAddress, info);
            } else if (type === "delete") {
                newData = yield call(addressAPI.deleteUserAddressById, info);
            } else if (type === "setDefault") {
                newData = yield call(addressAPI.setDefaultAddressById, info);
            };
            if (type === "delete") {
                // yield call(addressAPI.deleteUserAddressById, info);
                newData = info;//id
            }
            yield put({ type: "setAddress", payload: { type, info: newData } })
            if (redirectUrl) {
                Taro.redirectTo({
                    url: redirectUrl
                })
            }
        },
    },
    subscriptions: {
        // test() {
        //     console.log("测试3")
        // }
    }
}