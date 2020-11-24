import { Random } from 'mockjs'
import ranNumFn from "@/utils/getRanNum"
import logoSrc from "@/assets/imgs/waimai/1.jpg"

/* 商家表 */
// 商家ID 商家名 电话号码 商家地址 logo 标语 评分 包装费 每月销售量 起送价格 配送费 公告
let i = 0;
function getMockData() {
    const arr = [];
    for (; i < 100; i++) {
        arr.push({
            id: i,
            phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
            // name: Random.cname(),//商家名
            name: "店铺" + i,
            // address: Random.county(true),//地址，地址放在地址表里了
            logoSrc: logoSrc,//logo图标
            shortIntroduction: Random.cword(5, 7),//标语
            lowestPrice: ranNumFn(0, 10), //起送价,
            deliverFee: ranNumFn(2, 5),//配送费
            packFee: ranNumFn(2,5),//包装费
            introduction: Random.cword(20, 21),
            mark: (function () {
                let num = (ranNumFn(0, 10) + Math.random())
                return num.toFixed(1)
            })(),
            sellPerMonth: ranNumFn(200, 3000),
            location: {
                /* 测试个人的位置 */
                // latitude: 22.71991,
                // longitude: 114.24779,
                latitude: 22.71991 + Math.random() - 0.5,
                longitude: 114.24779 + Math.random() - 0.5
            }
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