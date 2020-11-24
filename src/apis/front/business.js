import { selectBusiness, selectBusinessByCondition } from "../../service/apis/business"



/**
 * 根据condition条件来筛选
 * condition可填: nearest（默认，最近，升序），sellest（销量最高，降序）
 *
 * @export
 * @param {*} {limit,page}
 */
export async function selectSomeBusinessByCondition({ keywords, condition, longitude, latitude, limit = 10, page = 1 }) {
    const { data } = await selectBusinessByCondition({ keywords, condition, longitude, latitude, limit, page });
    console.log("selectSomeBusinessByConditionnnnnnnnnnnnnn")
    console.log(data)
    return data;
}

// export async function selectBusinessNameByKeyword(keyword) {
//     await selectBusiness()
// }
export async function selectBusinessById(id) {
    const { data } = await selectBusiness(id);
    return data
}

export default {
    selectBusinessById,
    selectSomeBusinessByCondition
}