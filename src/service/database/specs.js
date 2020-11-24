import  { Random } from 'mockjs'
import ranNumFn from "@/utils/getRanNum"
// import logoSrc from "@/assets/imgs/avatar/1.png"
import menuData from "./menu"
/* 菜品规格表 */
// id 菜品ID  规格  规格细分 价格
let i = 0;
function getMockData() {
    const arr = [];

    for (; i < menuData.data.length; i++) {
        const ranNum = ranNumFn(1, 5);
        if(!Random.boolean()){
            continue;
        }
        for (let j = 0; j < ranNum; j++) {
            arr.push({
                id: `specs:${i}-${j}`,
                menuId: menuData.data[i].id,
                type: `辣度:${i}`,
                detail: `微辣${i}-${j}`,
                price: +Math.random().toFixed(2)
            });
            arr.push({
                id: `specs:a${i}-${j}`,
                menuId: menuData.data[i].id,
                type: `饭量:${i}`,
                detail: `多${i}-${j}`,
                price: +Math.random().toFixed(2)
            });
            arr.push({
                id: `specs:b${i}-${j}`,
                menuId: menuData.data[i].id,
                type: `加料:${i}`,
                detail: `珍珠${i}-${j}`,
                price: +Math.random().toFixed(2)
            });
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

