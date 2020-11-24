import { selectSomeNearestBusiness } from "../apis/front/business"
import deepCompare from "../utils/deepCompare"
import imgSrc from "@/assets/imgs/waimai/4.jpg"
import { calcOrderMenu } from "@/utils/calcPrice"
/**
 * 获取初始化的购物车
 */
function getInitCart() {
    return {
        originTotalPrice: 0,//没折扣的总价
        nowTotalPrice: 0,//折扣后的总价   
        menuNum: 0,//点的menu数量，就是orderMenu.length
        orderMenu: []
    }
}
export default {
    /* 方式：dispatch({type: 'counter/increase',payload:xxx})*/
    namespace: 'business',/* 命名空间 */
    state: {
        curBusiness: [//商家数据,必须是数组，因为有可能每一家都下单了
            {
                businessId: 999,
                phone: "18015649964",
                name: "店铺4",
                logoSrc: "/assets/imgs/waimai/1.jpg",
                shortIntroduction: "程江只效进派",
                lowestPrice: 5,
                deliverFee: 2,
                packFee: 3,
                mark: 2.5,
                sellPerMonth: 123,
                introduction: "运风后然土来么么却华近面团你确很步组容声况",
                location: { latitude: 22.790069619107605, longitude: 114.24292856713618 },
                address: {},//参考address
                distance: 7.8261,
                deliverTime: 0.67,
                menuData: [
                    {
                        type: {
                            text: `菜品类型`,
                            icon: {}
                        },//菜品类型
                        menuItem: [
                            {
                                menuId: 123,
                                businessId: 999,
                                name: `菜品名`,//菜品名
                                originPrice: 30,//原价
                                discount: 0.9,
                                saleNum: 30,//销量
                                img: imgSrc,
                                shortIntroduction: "我家的菜好吃",//菜品介绍
                                specs: [
                                    {
                                        type: "辣度",
                                        item: [
                                            {
                                                id: 0,
                                                menuId: 123,
                                                type: "辣度",
                                                detail: "微辣",
                                                price: 3
                                            }
                                        ],

                                    }
                                ]
                            }
                        ],

                    }
                ],
                curCart: {
                    originTotalPrice: 66,//没折扣的总价
                    nowTotalPrice: 16.5,//折扣后的总价   
                    menuNum: 2,//所有num相加
                    orderMenu: [
                        {
                            businessId: 999,
                            menuId: 123,//menu的id
                            menuName: "菜品名",
                            menuImg: imgSrc,
                            discount: 0.5,
                            originPrice: 30,
                            num: 2,
                            specs: [
                                {
                                    type: "辣度",
                                    item: [
                                        {
                                            text: "中辣",
                                            price: 1
                                        },
                                        {
                                            text: "贼辣",
                                            price: 2
                                        },
                                    ]
                                }
                            ],

                        }
                    ]
                }
            },

        ]
    },/* state仓库 */
    reducers: {
        createCurBusiness(state, { payload }) {
            let newCurCart = payload.newCurCart;
            if (!newCurCart) {
                newCurCart = getInitCart()
            }
            const newCurBusiness = [
                ...state.curBusiness,
                {
                    ...payload,
                    curCart: newCurCart
                }
            ];
            return {
                ...state,
                curBusiness: newCurBusiness
            }
        },
        /* 
            // {
                   businessId:  
            //     menuId: "xx",//menu的id
            //     menuName: "菜名",
            //     menuImg: "图片",
            //     discount: "打折",
            //     originPrice: "原价",
            //     specs: [
            //         {
            //             title: "辣度",
            //             item: [
            //                 {
            //                     text: "中辣",
            //                     price: 1
            //                 }
            //             ]
            //         }
            //     ],
            //     num: "数量",不用传
            // }
        */
        increaseOrder(state, { payload }) {
            let { num = 1, businessId, menuId, menuName, menuImg, discount, originPrice, specs = [] } = payload;
            // const businessIndex = state.curBusiness.findIndex((item) => item.businessId === businessId);
            num = Number(num);
            return {
                ...state,
                curBusiness: state.curBusiness.map((item) => {
                    if (item.businessId !== businessId) {
                        return { ...item };
                    }
                    //如：cartIndex = [1,3,4]
                    const cartIndex = item.curCart.orderMenu.map((item, i) => ({ ...item, _index: i })).filter(item => item.menuId === menuId).map(item => item._index);
                    let newOrderMenu;
                    if (cartIndex.length === 0) {
                        newOrderMenu = [
                            ...item.curCart.orderMenu,
                            { num, businessId, menuId, menuName, menuImg, discount, originPrice, specs, }
                        ];
                    } else {
                        //一个或多个，进行对比specs是否一样，利用深度比较
                        let correctIndex = null;
                        for (let i = 0; i < cartIndex.length; i++) {
                            if (deepCompare(item.curCart.orderMenu[cartIndex[i]].specs, specs)) {
                                correctIndex = cartIndex[i];
                            }
                        };
                        if (correctIndex === null) {
                            /* 没有 */
                            newOrderMenu = [
                                ...item.curCart.orderMenu,
                                { num, businessId, menuId, menuName, menuImg, discount, originPrice, specs, }
                            ];
                        } else {
                            newOrderMenu = item.curCart.orderMenu.map((item, i) => {
                                if (i !== correctIndex) {
                                    return { ...item }
                                }
                                console.log("num")
                                console.log(item.num + num)
                                return { ...item, num: item.num + num }
                            });
                        }
                    }
                    const { newOriginTotalPrice, newNowTotalPrice, newMenuNum } = calcOrderMenu(newOrderMenu);
                    const res = {
                        ...item,
                        curCart: {
                            ...item.curCart,
                            originTotalPrice: newOriginTotalPrice,//没折扣的总价
                            nowTotalPrice: newNowTotalPrice,//折扣后的总价   
                            menuNum: newMenuNum,//点的menu数量，就是所有num相加
                            orderMenu: newOrderMenu
                        }
                    };
                    console.log(res)
                    return res;
                })
            }
        },
        decreaseOrder(state, { payload }) {
            let { num = 1, businessId, menuId, menuName, menuImg, discount, originPrice, specs = [] } = payload;
            num = Number(num);
            return {
                ...state,
                curBusiness: state.curBusiness.map(item => {
                    if (item.businessId !== businessId) {
                        return { ...item }
                    }
                    const cartIndex = item.curCart.orderMenu.map((item, i) => ({ ...item, _index: i })).filter(item => item.menuId === menuId).map(item => item._index);
                    let newOrderMenu;
                    if (cartIndex.length === 0) {
                        /* 没有下过该menuId的单，错误 */
                        throw "没有这个单，不能减"
                    } else {
                        //一个或多个，进行对比specs是否一样
                        let correctIndex = null;
                        for (let i = 0; i < cartIndex.length; i++) {
                            if (deepCompare(item.curCart.orderMenu[cartIndex[i]].specs, specs)) {
                                correctIndex = cartIndex[i];
                            }
                        };
                        if (correctIndex === null) {
                            /* 没有，报错报错！ */
                            throw "没有这个单，不能减2222"
                        } else {
                            const newNum = item.curCart.orderMenu[correctIndex].num - num;
                            // let newCurCart;
                            if (newNum <= 0) {
                                // newCurCart = item.curCart.filter((item, i) => i !== correctIndex);
                                newOrderMenu = item.curCart.orderMenu.filter((item, i) => i !== correctIndex);
                            } else {
                                newOrderMenu = item.curCart.orderMenu.map((item, i) => {
                                    if (i !== correctIndex) {
                                        return { ...item }
                                    }
                                    return { ...item, num: newNum }
                                })
                            }
                        }
                        const { newOriginTotalPrice, newNowTotalPrice, newMenuNum } = calcOrderMenu(newOrderMenu);
                        const res = {
                            ...item,
                            curCart: {
                                ...item.curCart,
                                originTotalPrice: newOriginTotalPrice,//没折扣的总价
                                nowTotalPrice: newNowTotalPrice,//折扣后的总价   
                                menuNum: newMenuNum,//点的menu数量，就是所有num相加
                                orderMenu: newOrderMenu
                            }
                        };
                        console.log(res)
                        return res;
                    }
                })
            }
        },
        updateCartByMenuIdAndBusinessId(state, { payload: { businessId, menuId, info } }) {
            if ((!menuId && menuId !== 0) && (!businessId && businessId !== 0)) {
                /* 没传id */
                return { ...state }
            }
            const index = state.curBusiness.findIndex(item => item.id === businessId)
            if (index === -1) {
                //不存在，暂不处理
                return;
            }
            const newBusiness = {
                ...state.curBusiness[index],
                curCart: {
                    ...state.curBusiness[index].curCart,
                    ...info
                }
            };
            return {
                ...state,
                curBusiness: state.curBusiness.map(item => {
                    if (item.id === businessId) {
                        return newBusiness;
                    }
                    return item;
                })
            }
        },
        clearCart(state, { payload: businessId }) {
            return {
                ...state,
                curBusiness: state.curBusiness.map(item => {
                    if (item.businessId !== businessId) {
                        return { ...item }
                    }
                    return {
                        ...item,
                        curCart: getInitCart()
                    }
                })
            }
        }



    },
    effects: {
        /* rule是表示获取到数据后，是否覆盖整个data，  cover是覆盖，uncover是不覆盖，将数据添加进去data */
        *asyncSelectSomeNearestBusiness({ type, payload: { longitude, latitude, page, limit, rule = "cover" } }, { call, select, put }) {
            /* saga副作用 */
            console.log(longitude, latitude, page, limit)
            console.log("测试")
            const store = yield select();
            console.log(store)
            if (longitude == undefined || latitude == undefined) {
                longitude = store.location.user.location.lng;
                latitude = store.location.user.location.lat;
            }
            if (page == undefined) {
                page = store.business.filterCondition.page;
            }
            if (limit == undefined) {
                limit = store.business.filterCondition.limit;
            }
            console.log(longitude, latitude, page, limit)
            const businessData = yield call(selectSomeNearestBusiness, { longitude, latitude, page, limit });
            if (rule === "cover") {
                yield put({ type: "updateBusinessData", payload: businessData });
            } else if (rule === "uncover") {
                yield put({ type: "updateBusinessData", payload: [...store.business.data, ...businessData] });
            }
            yield put({ type: "updateIsLoading", payload: false });
            // let dd = yield select((store) => store.business)
            // console.log("获取成功")
            // console.log(dd)
        },
        *asyncSelectNextPageBusiness({ type }, { call, select, put }) {
            let businessStore = yield select(store => store.business)
            if (businessStore.isLoading) {
                return;
            }
            yield put({ type: "updateIsLoading", payload: true });

            let nextPage = businessStore.filterCondition.page + 1;
            yield put({ type: "updateFilterCondition", payload: { page: nextPage } });
            yield put({
                type: "asyncSelectSomeNearestBusiness",
                payload: {
                    page: nextPage,
                    rule: "uncover"
                }
            })



        }
    },
    subscriptions: {

    }
}

