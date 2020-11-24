import dva from './dva'
import models from './models'


const dvaApp = dva.createApp({
    initialState: {},
    models,
    // onEffect({ select, call, put }, model, actionType) {
    //     console.log(...args)
    //     return function* (action) {

    //         yield put(action);
    //     }
    // }
});
/* dispatch：dvaApp.dispatch({tyope:"xx",payload:xx}) */
/* 获取store：dvaApp.getState() */
let store = dvaApp.getStore();
console.log(store)
export const dispatch = dvaApp.dispatch;
export const getStore = () => { return dvaApp.getStore() };
export default store;