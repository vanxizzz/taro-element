import userData from "../database/user"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import delay from "../../utils/delay"
import logoSrc from "../../assets/imgs/avatar/3.png"
/* 
{
    id: i,
    phone: `${ranNumFn(15900000000, 20000000000)}`,//电话
    avatar: logoSrc,//头像
    account: i + "vanxizzz",//账号名
    name: Random.cname(),//昵称
    shortIntroduction: Random.cparagraph(4, 10),
}
*/
function assignDefault(info) {
    return {
        avatar: logoSrc,
        // account: "test",
        name: "赵彦鑫",
        shortIntroduction: "最帅！",
        ...info
    }
}
/* 
    const response = await createUser({
      phone: "15976877763",
      name: "xxx"
    })
    this.phone = response.data.phone;
*/
export async function createUser(obj) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = userData.data.findIndex(item => item.phone === obj.phone);
    if (tempIndex !== -1) {
        /* 账号存在 */
        response.status = FAIL;
        response.statusText = `${obj.phone} 该手机已注册`
    } else {
        let newId = userData.getOnlyId();
        let newData = {
            ...assignDefault(obj),
            id: newId,
        };
        userData.change([
            ...userData.data,
            newData
        ])
        userData.setOnlyId();
        response.status = SUCCESS;
        response.statusText = "create user ok~~";
        response.data = newData;
    }
    return response;
}


/* 
const response = await updateUser({
      phone: this.phone,
      name: "ddddd",
      account: "asdasd"
    });
*/
export async function updateUser({ phone, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = userData.data.findIndex(item => item.phone === phone);
    if (tempIndex === -1) {
        response.status = FAIL;
    } else {
        const newData = {
            ...userData.data[tempIndex],
            ...obj,
        }
        userData.change(userData.data.map(item => {
            if (item.phone === phone) {
                return newData;
            }
            return item;
        }))

        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update user ok~~"
    }
    return response;
}

/* 
const response = await selectUser(this.phone);
*/

export async function selectUser(phone) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = userData.data.findIndex(item => item.phone === phone);
    if (tempIndex === -1) {
        response.status = FAIL;
        response.statusText = `${phone} 该号码不存在`
    } else {
        response.data = {
            ...userData.data[tempIndex]
        }
        response.status = SUCCESS;
        response.statusText = "select user ok~~"
    }

    return response;
}

/* 
const response = await deleteUser(this.phone);
*/

export async function deleteUser(phone) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = userData.data.findIndex(item => item.phone === phone);

    if (tempIndex === -1) {
        response.statusText = `${phone} 不存在`
        response.status = FAIL;
    } else {
        userData.change(userData.data.map(item => item.phone !== phone))
        response.status = SUCCESS;
        response.statusText = "delete user ok~~";
    }

    return response;
}

export default {
    createUser,
    updateUser,
    selectUser,
    deleteUser
}
