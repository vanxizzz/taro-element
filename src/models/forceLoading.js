import delay from "@/utils/delay"

export default {
    /* 方式：dispatch({type: 'counter/increase',payload:xxx})*/
    namespace: 'forceLoading',/* 命名空间 */
    state: true,/* state仓库 */
    reducers: {
        change(state, { payload }) { return payload },
        showLoading(state, { payload }) {
            return true;
        },
        hideLoading(state, { payload }) {
            return false;
        }
    },
    effects: {
        *asyncShowLoading({ type, payload }, { select, put, call }) {
            /* saga副作用 */
            console.log("那你11")
            yield put({ type: "showLoading" });
            while (yield select(store => store.forceLoading)) {
                yield call(delay, 100)
            };
            yield put({ type: "hideLoading" });
        }
    },
    subscriptions: {
        /* 订阅，模型加载后立即触发的事情，可以用来设置监听事件 */
        log({ dispatch, history }) {
            console.log('模型开始加载了');
        }
    }
}