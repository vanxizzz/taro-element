import { createAddress, selectAddress, updateAddress, deleteAddress, setDefaultAddress } from "../../service/apis/address"
import { SUCCESS, FAIL } from "@/service/apis/constance"
export async function selectUserAddressById(id, idType = "userId") {
    const response = await selectAddress(id, idType);
    if (response.status === FAIL) {
        console.log(response.statusText);
        console.log("错误")
        return;
    }
    return response.data;
}
export async function createUserAddress(obj) {
    if (obj.userId == null) {
        console.log("没有userId");
        return;
    }
    const response = await createAddress(obj);
    if (response.status === FAIL) {
        console.log(response.statusText);
        console.log("错误")
        return;
    }
    return response.data
}
export async function updateUserAddress(obj) {
    if (!obj.id) {
        console.log("没有id");
        return;
    }
    const response = await updateAddress(obj);
    if (response.status === FAIL) {
        console.log(response.statusText);
        console.log("错误")
        return;
    }
    return response.data
}
export async function deleteUserAddressById(id) {
    const response = await deleteAddress(id);
    if (response.status === FAIL) {
        console.log(response.statusText);
        console.log("错误")
        return;
    }
    return response;
}
/**
 *设置默认地址
 *
 * @export
 * @param {*} id
 */
export async function setDefaultAddressById(id) {
    const response = await setDefaultAddress(id);
    if (response.status === FAIL) {
        console.log(response.statusText);
        console.log("错误")
        return;
    }
    return response.data;
}
export default {
    selectUserAddressById,
    createUserAddress,
    updateUserAddress,
    deleteUserAddressById,
    setDefaultAddressById
}