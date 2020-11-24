import { Random } from 'mockjs'
import ranNumFn from "@/utils/getRanNum"
// import logoSrc from "@/assets/imgs/avatar/1.png"
import businessData from "./business"
import userData from "./user"
/* 地址表 */
// 地址ID 全称 省 市 区 详细地址 姓名 性别（1男0女）地址标签（home，company，school） 电话 用户ID 商家ID 是否是默认地址
let i = 0;
function getMockData() {
    const arr = [];
    let j = 0;
    /* 商家的 */
    while (i < businessData.data.length) {
        const ranAddress = Random.county(true);
        const ranAddressArr = ranAddress.split(" ");
        const detailAddress = "肯德基"//详细地址
        arr.push({
            id: i,
            fullName: ranAddressArr[0] + ranAddressArr[1] + ranAddressArr[2] + detailAddress,
            province: ranAddressArr[0],
            city: ranAddressArr[1],
            county: ranAddressArr[2],
            detailAddress,
            // name: null,
            // sex: null,
            // userId: null,
            phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
            businessId: businessData.data[i].id,
            // isDefault: false//默认地址
        })
        i++;
    }
    /* 用户的 */
    while (i < businessData.data.length + userData.data.length) {

        const ranAddress = Random.county(true);
        const ranAddressArr = ranAddress.split(" ");
        const detailAddress = "前进公社"//详细地址
        arr.push({
            id: i,
            fullName: ranAddressArr[0] + ranAddressArr[1] + ranAddressArr[2] + detailAddress,
            province: ranAddressArr[0],
            city: ranAddressArr[1],
            county: ranAddressArr[2],
            detailAddress,
            name: Random.cname(),
            sex: ranNumFn(0, 1),
            phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
            tag: ["home", "company", "school"][ranNumFn(0, 2)],
            userId: userData.data[j].id,
            // businessId: null,
            isDefault: false//默认地址
        })
        i++;
        j++;
    }
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