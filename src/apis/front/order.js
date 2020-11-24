import { selectAllOrderByUserId, selectOrder, createOrder, updateOrder } from "../../service/apis/order"

export async function selectAllOrder(userId) {
    const { data } = await selectAllOrderByUserId(userId);
    return data;
}
export async function selectOrderById(id) {
    const { data } = await selectOrder(id);
    return data;
}
export async function updateOrderById(obj) {
    const { data } = await updateOrder(obj);
    return data;
}
export async function addOrder({ id, ...info } = {}) {
    const { data } = await createOrder(info);
    return data;
}