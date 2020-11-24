import Mock, { Random } from 'mockjs'
import ranNumFn from "@/utils/getRanNum"
import logoSrc from "@/assets/imgs/avatar/1.png"
import userData from "./user.js"

/* 红包表 */
// 红包ID 用户ID 商家ID 使用范围 使用说明 使用日期
/* 暂时不用 */
let i = 0
function getMockData() {
    const arr = [];
    for (; i < 100; i++) {
        // arr.push({
        //     id: i,
        //     phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
        //     name: Random.cname(),//商家名
        //     address: Random.county(true),//地址
        //     logoSrc: logoSrc,//logo图标
        //     shortIntroduction: Random.cword(10, 11),//标语
        //     lowestPrice: ranNumFn(0, 10), //起送价,
        //     deliverFee: ranNumFn(2, 5),//配送费
        //     introduction: Random.cword(20, 21)
        // });
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