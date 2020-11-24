import businessData from "../database/business"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import delay from "../../utils/delay"
import logoSrc from "../../assets/imgs/avatar/6.png"
import { selectAddress } from "./address"
import { deliverSpeed } from "./constance"
import calcDistance from "@/utils/calcDistance"
import deepClone from "@/utils/deepClone"

/* 注意：name,sex,phone,userId是针对用户的
    如果businessId存在，则上边都不存在
*/
// {
//     id: i,
//     phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
//     name: Random.cname(),//商家名
//     address: Random.county(true),//地址
//     logoSrc: logoSrc,//logo图标
//     shortIntroduction: Random.cparagraph(10, 11),//标语
//     lowestPrice: ranNumFn(0, 10), //起送价,
//     deliverFee: ranNumFn(2, 5),//配送费
//     introduction: Random.cparagraph(20, 21)
// }

function getDistanceData({ data, longitude, latitude, }) {
    let result = deepClone(data);
    /* 添加distance这个属性，方便后面排序 */
    result = result.map(item => {
        const distance = calcDistance({ lat: latitude, lng: longitude }, { lat: item.location.latitude, lng: item.location.longitude });
        return {
            ...item,
            distance,
            deliverTime: distance / deliverSpeed
        }
    });
    return result;
}

function assignDefault(info) {
    return {
        ...info
    }
}

export async function createBusiness(obj) {
    await delay(1000);
    const response = createResponse();
    const newId = businessData.getOnlyId();
    const newData = {
        ...assignDefault(obj),
        latitude: 22.71991 + Math.random() - 0.5,//测试的，需要根据位置获取
        longitude: 114.24779 + Math.random() - 0.5,//测试，需要根据位置获取
        id: newId,
    };
    businessData.change([
        ...businessData.data,
        newData
    ])
    businessData.setOnlyId();
    response.status = SUCCESS;
    response.statusText = "create business ok"
    response.data = newData;
    return response;
}

export async function updateBusiness({ id, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let targetAddressIndex = businessData.data.findIndex((item) => item.id === id);

    if (!targetAddressIndex === -1) {
        //没找到
        response.status = FAIL
    } else {
        const newbusinessData = businessData.data.find((item, i) => {
            return item.id === id;
        })
        const newData = {
            ...newbusinessData,
            ...obj,
            id,
        }
        businessData.change(businessData.data.map(item => {
            if (item.id === id) {
                return newData;
            }
            return item;
        }))
        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update business ok";
    }
    return response;
}


export async function selectBusiness(id) {
    await delay(1000);
    const response = createResponse();
    let target = businessData.data.filter((item) => item.id === id);
    if (target.length <= 0) {
        /* 没有 */
        response.status = FAIL;
    } else {
        response.data = target[0];
        response.statusText = "select business ok";
        response.status = SUCCESS;
    }
    return response;
}
/**
 * 分页获取
 * @param {*} page是第1页开始 
 * @param {*} limit是每页几条数据 
 * @param {*} all表示是否获取全部 
 */
export async function selectSomeBusiness({ page = 1, limit = 10, all = false }) {
    await delay(1000);
    const response = createResponse();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    let resultArr = [];
    let promiseArr = [];
    if (all) {
        // resultArr = [...businessData.data];
        resultArr = deepClone(businessData.data);
    } else {
        for (let i = startIndex; i <= endIndex; i++) {
            // resultArr.push({
            //     ...businessData.data[i]
            // })
            promiseArr.push(new Promise(async resolve => {
                const { data } = await selectAddress(businessData.data[i].id, "businessId");
                resolve({
                    ...businessData.data[i],
                    address: data
                });
            }))
        };
        resultArr = await Promise.all(promiseArr);
    }

    response.data = resultArr;
    response.status = SUCCESS;
    return response;
}



/**
 * 获取距离最近的一些商家
 * @param {*} longitude经度 
 * @param {*} latitude纬度 
 * @param {*} limit获取商家的数量 
 */
export async function selectNearestBusiness({ longitude, latitude, limit = 10, page = 1 }) {
    await delay(1000);
    const response = createResponse();
    // let { data } = await selectSomeBusiness({ page, limit });
    let data = getDistanceData({ data: businessData.data, longitude, latitude });
    // let data = deepClone(businessData.data);
    // /* 添加distance这个属性，方便后面排序 */
    // data = data.map(item => {
    //     const distance = calcDistance({ lat: latitude, lng: longitude }, { lat: item.location.latitude, lng: item.location.longitude });
    //     return {
    //         ...item,
    //         distance,
    //         deliverTime: distance / deliverSpeed
    //     }
    // })
    /* 所有数据排序 */
    data = data.sort((a, b) => a.distance - b.distance);
    // data.sort((a, b) => {
    //     return a.location.longitude - b.location.longitude
    // });
    let resultData = [];
    let firstIndex = (page - 1) * limit;
    let endIndex = firstIndex + limit - 1;
    for (let i = firstIndex; i < endIndex; i++) {
        resultData.push(data[i]);
    };
    response.data = resultData;
    response.status = SUCCESS;
    return response;
}
/**
 * 获取销量最高的商家
 * @param {*} longitude经度 
 * @param {*} latitude纬度 
 * @param {*} limit获取商家的数量 
 */
export async function selectBusinessByCondition({ keywords = "", condition = "distance", longitude, latitude, limit = 10, page = 1 }) {
    await delay(1000);
    const mapProps = {
        // 约定好的字符串：{
        //     prop: "对应的data的属性名",
        //     asc: true是否升序排列
        // }
        "distance": {//最近
            prop: "distance",
            asc: true
        },
        "sellPerMonth": {//销售量最高
            prop: "sellPerMonth",
            asc: false
        },
        "lowestPrice": {//最低起送价
            prop: "lowestPrice",
            asc: true
        },
        "mark": {//好评优先
            prop: "mark",
            asc: false
        },

    }
    const response = createResponse();
    let tempData = deepClone(businessData.data);
    if (keywords) {
        /* 关键字查询 */
        tempData = tempData.filter(item => item.name.includes(keywords));
    }
    let data = getDistanceData({ data: tempData, longitude, latitude });
    /* 根据条件排序 */
    let isAsc = mapProps[condition].asc;
    data = data.sort((a, b) => {
        let res = a[mapProps[condition].prop] - b[mapProps[condition].prop];
        return isAsc ? res : -res;
    });
    let firstIndex = (page - 1) * limit;
    let endIndex = firstIndex + limit - 1;
    response.data = data.filter((item, index) => index >= firstIndex && index <= endIndex);
    response.status = SUCCESS;
    return response;
}
export async function deleteBusiness(id) {
    await delay(1000);
    const response = createResponse();
    let targetIndex = businessData.data.findIndex((item) => item.id === id);
    if (targetIndex === -1) {
        /* 没有 */
        response.status = FAIL;
    } else {
        const newbusinessData = businessData.data.filter((item) => item.id !== id);
        businessData.change(newbusinessData);
        response.statusText = "delete business ok";
        response.status = SUCCESS;
    }
    return response;
}
export default {
    createBusiness,
    updateBusiness,
    selectBusiness,
    selectSomeBusiness,
    selectNearestBusiness,
    deleteBusiness
}