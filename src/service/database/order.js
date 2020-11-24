import { Random } from 'mockjs'
// import logoSrc from "@/assets/imgs/avatar/1.png"
import imgSrc from "@/assets/imgs/waimai/2.jpg"
// import ranNumFn from "@/utils/getRanNum"
// import menuData from "./menu"
import businessData from "./business"
import userData from "./user"
import moment from "moment"
import uuid from "@/utils/uuid"
/* 下单表 */
// 下单id 用户ID 商家ID 菜品ID 数量 规格 下单时间
let i = 0;
function getMockData() {
    const arr = [];
    
    for (; i < userData.data.length; i++) {
        const businessInfo = businessData.data[i];
        if (!businessInfo) {
            continue;
        }
        arr.push({
            id: i,
            orderId: uuid(),//订单号，要和id区分开来，id不能有任何业务含义
            userId: userData.data[i].id,//用户id
            isPaid: Random.boolean(),//是否已经付钱了，因为有的可能是下单了，但是没付钱
            createTime: moment().valueOf(),//时间戳订单创建时间，或者说下单时间
            expireTime: moment().add(15, "minutes").valueOf(),//过期时间：创建时间 + 15分钟
            info: {//订单信息
                businessInfo: { ...businessInfo },
                // businessInfo: {//商家的信息
                //     businessId: businessInfo.id,
                //     logoSrc: businessInfo.logoSrc,
                //     name: businessInfo.name,
                //     phone: businessInfo.phone,
                //     location: businessInfo.location,
                //     packFee: businessInfo.packFee,
                //     deliverFee: businessInfo.deliverFee
                // },
                cart: {//订单的东西
                    originTotalPrice: 120,//没折扣的总价
                    nowTotalPrice: 90,//折扣后的总价   
                    menuNum: 5,//所有num相加
                    orderMenu: [
                        {
                            businessId: businessInfo.id,
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
                                            price: 0
                                        },
                                        {
                                            text: "贼辣",
                                            price: 0
                                        },
                                    ]
                                }
                            ],

                        },
                        {
                            businessId: businessInfo.id,
                            menuId: 124,//menu的id
                            menuName: "菜品名22",
                            menuImg: imgSrc,
                            discount: 1,
                            originPrice: 30,
                            num: 2,
                            specs: [
                            ],
                        },
                    ]
                }
            },
            targetAddress: {
                //用户地址
                id: i,
                fullName: "广东省深圳市宝安区松岗街道宝利豪庭金兰苑10C",
                province: "广东省",
                city: "深圳市",
                county: "宝安区",
                detailAddress: "宝利豪庭金兰苑10C",
                name: "赵",
                sex: 0,//0男1女
                phone: "15976877763",
                tag: "company",
                userId: 1234,
                isDefault: false
            },

            // menuId: menuData.data[i].id,
            // type: "辣度",
            // detail: "微辣"
        });
    };
    return arr;
}
export default {
    data: getMockData(),
    maxId: i,
    change(value) {
        this.data = value;
    },
    getOnlyId() {
        return this.maxId
    },
    setOnlyId() {
        this.maxId += 1;
    }
};

