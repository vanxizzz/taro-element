import { reverseGeocoder } from "../qqmapAPI"

export default {
    namespace: 'location',/* 命名空间 */
    state: {
        user: {
            formatted_addresses: {
                recommend: "深圳市龙岗区龙翔大道",//推荐的完整地址
                rough: "深圳市龙岗区龙翔大道"//粗略的地址
            },
            address_component: {
                nation: "中国",//中国
                province: "广东省",//广东省
                city: "深圳市",//深圳市
                district: "龙岗区",//龙岗区
                street: "龙翔大道",//龙翔大道
                street_number: "龙翔大道",//龙翔大道
            },
            address: "深圳市龙岗区龙翔大道",//完整地址
            location: {
                lat: 22.71991,//测试
                lng: 114.24779//测试
            }
        }
    },/* state仓库 */
    reducers: {
        increase(state, action) { return state + 1; },
        decrease(state, action) { return state - 1; },
        updateUserLocation(state, { payload }) {
            return {
                ...state,
                user: {
                    ...payload
                }
            }
        }
    },
    effects: {
        *asyncGetLocation({ payload }, { call, put, select }) {
            const res = yield call(reverseGeocoder);
            console.log("位置！！")
            console.log(res);
            const { formatted_addresses, address_component, address, location } = res.result;
            yield put({
                type: "updateUserLocation",
                payload: {
                    formatted_addresses,
                    address_component,
                    address,
                    location
                }
            })
            yield put({
                type: "business/asyncSelectSomeNearestBusiness",
                payload: {
                    longitude: location.lng,
                    latitude: location.lat,
                }
            })
        }
    },
    subscriptions: {
    }
}