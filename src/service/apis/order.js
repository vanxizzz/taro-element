import orderData from "../database/order"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import logoSrc from "../../assets/imgs/avatar/2.png"
import delay from "../../utils/delay"
import moment from "moment"
import uuid from "@/utils/uuid"
function assignDefault(info) {
    return {
        ...info
    }
}

export async function createOrder(obj) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = orderData.data.findIndex(item => item.id === obj.id);
    if (tempIndex !== -1) {
        /* 账号存在 */
        response.status = FAIL;
        response.statusText = `${obj.id} 已存在`
    } else {
        let newId = orderData.getOnlyId();
        let newData = {
            id: newId,
            ...assignDefault(obj),
            createTime: moment().valueOf(),//订单创建时间
            expireTime: moment().add(15, "minutes"),//订单过期时间：创建时间+15分钟
            orderId: uuid()//订单号
        };
        orderData.change([
            ...orderData.data,
            newData
        ])
        orderData.setOnlyId();
        response.status = SUCCESS;
        response.statusText = "create order ok~~";
        response.data = newData;
    }
    return response;
}

export async function updateOrder({ id, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = orderData.data.findIndex(item => item.id === id);
    if (tempIndex === -1) {
        response.status = FAIL;
    } else {
        const newData = {
            ...orderData.data[tempIndex],
            ...obj,
            createTime: orderData.data[tempIndex].createTime,
            orderId: orderData.data[tempIndex].orderId,
        }
        orderData.change(orderData.data.map(item => {
            if (item.id === id) {
                return newData;
            }
            return item;
        }))

        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update order ok~~"
    }
    return response;
}

export async function selectOrder(id) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = orderData.data.findIndex(item => +item.id === +id);
    if (tempIndex === -1) {
        response.status = FAIL;
        response.statusText = `id为${id}的订单查询不到`
    } else {
        response.data = orderData.data[tempIndex];
        response.status = SUCCESS;
        response.statusText = "select order ok~~"
    }
    return response;
}

/* 
const response = await deleteUser(this.phone);
*/

export async function deleteOrder(id) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = orderData.data.findIndex(item => item.id === id);

    if (tempIndex === -1) {
        response.statusText = `${id} 不存在`
        response.status = FAIL;
    } else {
        orderData.change(orderData.data.map(item => item.id !== id))
        response.status = SUCCESS;
        response.statusText = "delete order ok~~";
    }
    return response;
}

export async function selectAllOrderByUserId(userId) {
    await delay(1000);
    const response = createResponse();
    console.log(orderData)
    console.log(userId)
    let data = orderData.data.filter(item => +item.userId === +userId);
    response.data = data;
    response.status = SUCCESS;
    response.statusText = "selectAll order ok~~";
    return response;
}