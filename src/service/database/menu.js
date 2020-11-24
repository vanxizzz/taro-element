import { Random } from 'mockjs'
import ranNumFn from "@/utils/getRanNum"
import logoSrc from "@/assets/imgs/avatar/1.png"
import businessData from "./business"

/* 菜品表 */
// 菜品ID 商家ID 菜品名 菜品类型 菜品原价 菜品现价 菜品销量 菜品图片 菜品介绍
let i = 0;
function getMockData() {
    const arr = [];
    for (; i < businessData.data.length; i++) {
        const ran1 = ranNumFn(20, 30);
        for (let j = 0; j < ran1; j++) {
            const ranType = Random.cword(2, 4);
            arr.push({
                id: `menuId:${i}-${j}`,
                businessId: businessData.data[i].id,
                name: `菜品名${i}-${j}`,//菜品名
                type: {
                    text: `${ranType}${i}`,
                    icon: 1 ? { value: "hotIcon", color: "#f40" } : null
                },//菜品类型
                originPrice: ranNumFn(30, 40),//原价
                discount: function () {
                    let res;
                    while (1) {
                        res = +Math.random().toFixed(2)
                        if (res >= 0.1) {
                            break;
                        }
                    }
                    return res;
                }(),//打折0.1-1
                saleNum: ranNumFn(100, 200),//每月销量
                img: logoSrc,
                shortIntroduction: Random.cword(5, 10)//菜品介绍
            });
            // arr.push({
            //     id: `menuIdd:${i}-${j}`,
            //     businessId: businessData.data[i].id,
            //     name: `菜品名d${i}-${j}`,//菜品名
            //     type: {
            //         text: `型${i}`,
            //         icon: 1 ? { value: "hotIcon",color:"#f40" } : null
            //     },//菜品类型
            //     originPrice: ranNumFn(30, 40),//原价
            //     discount: function () {
            //         let res;
            //         while (1) {
            //             res = +Math.random().toFixed(2)
            //             if (res >= 0.1) {
            //                 break;
            //             }
            //         }
            //         return res;
            //     }(),//打折0.1-1
            //     saleNum: ranNumFn(100, 200),//每月销量
            //     img: logoSrc,
            //     shortIntroduction: Random.cword(5, 10)//菜品介绍
            // });
        };
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

