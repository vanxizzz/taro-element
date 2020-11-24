import specsData from "../../database/specs"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import logoSrc from "../../assets/imgs/avatar/2.png"
import delay from "../../utils/delay"
{/* 
    id
    menuId: specsData.data[i].id,
    type: "辣度",
    detail: "微辣"
    price: 价格
*/}

function assignDefault(info) {
    return {
        type: "饭量",
        detail: "多",
        price: 0,
        ...info
    }
}

export async function createSpecs(obj) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = specsData.data.findIndex(item => item.menuId === obj.menuId && item.type === obj.type && item.detail === obj.detail);
    if (tempIndex !== -1) {
        /* 账号存在 */
        response.status = FAIL;
        response.statusText = `${obj.type} ${obj.detail} 已存在`
    } else {
        let newId = specsData.getOnlyId();
        let newData = {
            id: newId,
            ...assignDefault(obj)
        };
        specsData.change([
            ...specsData.data,
            newData
        ])
        specsData.setOnlyId();
        response.status = SUCCESS;
        response.statusText = "create specs ok~~";
        response.data = newData;
    }
    return response;
}

export async function updateSpecs({ id, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = specsData.data.findIndex(item => item.id === id);
    if (tempIndex === -1) {
        response.status = FAIL;
    } else {
        const newData = {
            ...specsData.data[tempIndex],
            ...obj,
        }
        specsData.change(specsData.data.map(item => {
            if (item.id === id) {
                return newData;
            }
            return item;
        }))

        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update specs ok~~"
    }
    return response;
}

export async function selectSpecs(id) {
    await delay(1000);
    const response = createResponse();
    let arr = specsData.data.filter(item => item.id === id);
    response.data = arr[0];
    response.status = SUCCESS;
    return response;
}
export async function selectAllSpecsBymenuId(menuId) {
    await delay(1000);
    const response = createResponse();
    let arr = specsData.data.filter(item => item.menuId === menuId);
    response.status = SUCCESS;
    response.data = arr;
    return response;
}

/* 
const response = await deleteUser(this.phone);
*/

export async function deleteSpecs(id) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = specsData.data.findIndex(item => item.id === id);

    if (tempIndex === -1) {
        response.statusText = `${id} 不存在`
        response.status = FAIL;
    } else {
        specsData.change(specsData.data.filter(item => item.id !== id))
        response.status = SUCCESS;
        response.statusText = "delete specs ok~~";
    }

    return response;
}

export default {
    createSpecs,
    updateSpecs,
    selectSpecs,
    deleteSpecs
}
