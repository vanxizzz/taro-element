import  { Random } from 'mockjs'
// import ranNumFn from "@/utils/getRanNum"
import logoSrc from "@/assets/imgs/avatar/1.png"
// import businessData from "./business"

/* 用户表 */
// 用户ID  用户手机 头像 账号名 昵称 简介 
let i = 0;
function getMockData() {
    const arr = [];
    for (; i < 2; i++) {
        arr.push({
            id: i,
            // phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
            phone: i + "",//电话
            avatar: logoSrc,//头像
            // account: i + "vanxizzz",//账号名
            name: Random.cname(),//昵称
            shortIntroduction: Random.cword(4, 10),
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

