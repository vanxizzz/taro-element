import addressData from "../database/address"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import delay from "../../utils/delay"

/* 注意：name,sex,phone,userId是针对用户的
    如果businessId存在，则上边都不存在
*/

// {
//     id: i,
//     fullName:不用传 ranAddressArr[0] + ranAddressArr[1] + ranAddressArr[2] + detailAddress,
//     province: ranAddressArr[0],
//     city: ranAddressArr[1],
//     county: ranAddressArr[2],
//     detailAddress,
//     name: null,
//     sex: null,
//     phone: 电话 
//     userId: null,
//     businessId: businessData[i].id,
//     isDefault: false
// } 

function assignDefault(info) {
    return {
        isDefault: false,
        ...info
    }
}

/* 
const response = await createAddress({
    province: "广东省",
    city: "深圳市",
    county: "宝安区",
    detailAddress: "前急急急",
    name: "赵彦鑫",
    sex: "男",
    phone: "15976877763",
    userId: this.userId, 必传，用户id
})
data返回创建后的地址数据
*/
export async function createAddress(obj) {
    await delay(1000);
    const response = createResponse();
    const newId = addressData.getOnlyId();
    const newData = {
        ...assignDefault(obj),
        id: newId,
        fullName: obj.province + obj.city + obj.county + obj.detailAddress,
    };
    addressData.change([
        ...addressData.data,
        newData
    ])
    addressData.setOnlyId();
    // addressData.push({
    //     ...obj,
    //     id: addressData.data[addressData.data.length - 1].id + 1,
    //     fullName: obj.province + obj.city + obj.county + obj.detailAddress,
    // })
    response.status = SUCCESS;
    response.statusText = "create address ok"
    response.data = newData;
    return response;
}


/* 
const response = await updateAddress({
    id: this.addressId, 必传，地址id
    province: "广东省",
    city: "深圳市",
    county: "宝安区",
    detailAddress: "前进公社",
    name: "赵彦鑫22222",
    sex: 0,
    phone: "15976877763",
});
data返回更新后的地址数据
*/

export async function updateAddress({ id, userId, businessId, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let targetAddressIndex = addressData.data.findIndex((item) => item.id === id);

    if (!targetAddressIndex === -1) {
        //没找到
        response.status = FAIL
    } else {
        console.log(targetAddressIndex)
        const newAddressData = addressData.data.find((item, i) => {
            return item.id === id;
        })
        const newData = {
            ...newAddressData,
            ...obj,
            id,
            userId: newAddressData.userId,
            businessId: newAddressData.businessId
        }
        newData.fullName = newData.province + newData.city + newData.county + newData.detailAddress;
        addressData.change(addressData.data.map(item => {
            if (item.id === id) {
                return newData;
            }
            return item;
        }))
        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update address ok";
    }
    return response;
}

/* 
const response = await selectAddress(this.userId);用户id
data返回查询到的地址数据
*/

/**
 *
 *
 * @export
 * @param {*} theId
 * @param {*} idType id businessId userId
 * @return {*} 
 */
export async function selectAddress(theId, idType) {
    await delay(1000);
    const response = createResponse();
    let target = addressData.data.filter((item) => item[idType] === theId);
    response.data = target;
    if (idType !== "userId") {
        response.data = target[0];
    }
    response.statusText = "select address ok";
    response.status = SUCCESS;

    return response;
}

/* 
const response = await deleteAddress(this.addressId);地址id
data无返回
*/
export async function deleteAddress(id) {
    await delay(1000);
    const response = createResponse();
    let targetIndex = addressData.data.findIndex((item) => item.id === id);
    if (targetIndex === -1) {
        /* 没有 */
        response.status = FAIL;
    } else {
        const newAddressData = addressData.data.filter((item) => item.id !== id);
        addressData.change(newAddressData);
        response.statusText = "delete address ok";
        response.status = SUCCESS;
    }
    return response;
}

export async function setDefaultAddress(id) {
    await delay(1000);
    const response = createResponse();
    let data = addressData.data.map(item => {
        if (item.id === id) {
            return {
                ...item,
                isDefault: true
            }
        }
        return { ...item, isDefault: false }
    });
    addressData.change(data);
    response.status = SUCCESS;
    response.statusText = "设置默认地址成功";
    response.data = data;
    return response;
}


export default {
    createAddress,
    updateAddress,
    selectAddress,
    deleteAddress,
    setDefaultAddress
}