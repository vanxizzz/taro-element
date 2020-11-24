import { selectUser, createUser } from "../../service/apis/user"
import { selectAddress } from "../../service/apis/address"
import code from "../identifyCode"
import { SUCCESS, FAIL } from "../../service/apis/constance"
import { selectUserAddressById } from "./address"

/**
 * 获取单个用户信息，通过电话和验证码
 * 记得要获取用户基本信息，地址
 * @param {*} phone 电话，identifyCode验证码  type是wechat(微信一键登录)或phone（需要验证码登录）
 */
export async function loginOneUserInfo({ phone, identifyCode, type = "phone", ...props } = { phone: null }) {
    console.log(code.getCode(), identifyCode)
    if (code.getCode() !== identifyCode && type !== "wechat") {
        console.log("验证码错误")
        return;
    }
    if (typeof phone !== "string") {
        console.log("请传正确格式的phone");
        return;
    }
    /* 获取用户信息 */
    const userResponse = await selectUser(phone);
    if (userResponse.status === FAIL) {
        /* 不存在，应该转为注册 */
        const response = await createUser({ phone, ...props })
        response.data.address = [];
        return response.data;
    }
    /* 获取用户地址 */
    const addressData = await selectUserAddressById(userResponse.data.id);
    /* 未完成... */


    return {
        ...userResponse.data,
        address: addressData
    };
}

export default {
    loginOneUserInfo
}