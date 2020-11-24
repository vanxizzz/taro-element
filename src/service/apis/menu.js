import menuData from "../database/menu"
import specsData from "../database/specs"
import { selectAllSpecsBymenuId } from "./specs"
import createResponse from "../../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import logoSrc from "../../assets/imgs/avatar/2.png"
import delay from "../../utils/delay"

/* 
{
    id: i,
    businessId: businessData.data[i].id,
    name: Random.cname(),//菜品名
    type: {
        text: "菜品类型"
    },//菜品类型
    originPrice: ranNumFn(30, 40),//原价
    discount: 打折
    saleNum: ranNumFn(100, 200),//销量
    img: logoSrc,
    shortIntroduction: Random.cparagraph(5, 10)//菜品介绍
}
*/

/* 
    const response = await createUser({
      phone: "15976877763",
      name: "xxx"
    })
    this.phone = response.data.phone;
*/
function assignDefault(info) {
    return {
        name: "菜名",
        type: "菜品类型",
        originPrice: 125,
        discount: 0.95,
        saleNum: 55,
        img: logoSrc,
        shortIntroduction: "好好吃！",
        ...info
    }
}

export async function createMenu(obj) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = menuData.data.findIndex(item => item.id === obj.id);
    if (tempIndex !== -1) {
        /* 账号存在 */
        response.status = FAIL;
        response.statusText = `${obj.id} 已存在`
    } else {
        let newId = menuData.getOnlyId();
        let newData = {
            id: newId,
            ...assignDefault(obj)
        };
        menuData.change([
            ...menuData.data,
            newData
        ])
        menuData.setOnlyId();
        response.status = SUCCESS;
        response.statusText = "create menu ok~~";
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
export async function updateMenu({ id, ...obj }) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = menuData.data.findIndex(item => item.id === id);
    if (tempIndex === -1) {
        response.status = FAIL;
    } else {
        const newData = {
            ...menuData.data[tempIndex],
            ...obj,
        }
        menuData.change(menuData.data.map(item => {
            if (item.id === id) {
                return newData;
            }
            return item;
        }))

        response.data = newData;
        response.status = SUCCESS;
        response.statusText = "update menu ok~~"
    }
    return response;
}

/* 
const response = await selectUser(this.phone);
*/
/* idType可以是id或businessId */
export async function selectMenu(id, idType = "businessId") {
    await delay(1000);
    const response = createResponse();
    let tempArr = menuData.data.filter(item => item[idType] === id);
    if (idType === "id") {
        response.data = tempArr[0];
    } else {
        response.data = tempArr;
    }
    response.status = SUCCESS;
    response.statusText = "select menu ok~~"


    return response;
}

/* 
const response = await deleteUser(this.phone);
*/

export async function deleteMenu(id) {
    await delay(1000);
    const response = createResponse();
    let tempIndex = menuData.data.findIndex(item => item.id === id);

    if (tempIndex === -1) {
        response.statusText = `${id} 不存在`
        response.status = FAIL;
    } else {
        menuData.change(menuData.data.map(item => item.id !== id))
        response.status = SUCCESS;
        response.statusText = "delete menu ok~~";
    }

    return response;
}


/**
 *classifyData = [
     {
        type: {
            text:"xx",
            icon: {...}
        },
        item: [
            {
                id: i,
                businessId: businessData.data[i].id,
                name: Random.cname(),//菜品名
                type: Random.cname(),//菜品类型
                originPrice: ranNumFn(30, 40),//原价
                nowPrice: ranNumFn(10, 20),//现价
                saleNum: ranNumFn(100, 200),//销量
                img: logoSrc,
                shortIntroduction: Random.cparagraph(5, 10)//菜品介绍,
                specs: [
                    {
                        id
                        menuId: specsData.data[i].id,
                        type: "辣度",
                        detail: "微辣",
                        price: xx
                    },
                    ...
                ]
            }
        ]
     },
     ...
 ]
 *
 * @export
 * @param {*} businessId
 * @return {*} 
 */
export async function selectMenuAndSpecsByBusinessId(businessId) {
    await delay(1000);
    const response = createResponse();
    const { data } = await selectMenu(businessId, "businessId")
    const addSpecsData = addSpecs(data);
    const classifyMenuItemData = classifyMenuItem(addSpecsData);
    const classifySpecsItemData = classifySpecsItem(classifyMenuItemData)
    response.data = classifySpecsItemData;
    response.status = SUCCESS;
    return response;

    function classifySpecsItem(data) {
        const result = data.map(({ type, menuItem }) => {
            return {
                type,
                menuItem: menuItem.map(item => {
                    const allType = getAllSpecsType(item.specs);
                    let newSpecs = [];
                    for (let i = 0; i < allType.length; i++) {
                        const specsType = allType[i]
                        const specsItem = item.specs.filter(it => it.type === specsType);
                        newSpecs.push({ type: specsType, item: specsItem })
                    };
                    return {
                        ...item,
                        specs: newSpecs
                    }
                })
            }

        });
        return result;
    }
    function getAllSpecsType(specsArr) {
        const typeArr = [];
        specsArr.map(item => {
            if (typeArr.findIndex(type => type === item.type) === -1) {
                typeArr.push(item.type)
            }
        });
        return typeArr;
    }

    /**
     * 返回结果：[
     *  {
        menuId:0,
        businessId: 0
        name: "菜品名0-2"
        type: {text: "菜品类型0"}
        originPrice: 30
        discount: 0.28
        saleNum: 108
        img: "/assets/imgs/avatar/1.png"
        shortIntroduction: "半联党见铁共者离集"
        specs: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
      }
      ...
     * ]
     * @param {*} data 
     */
    function addSpecs(data) {
        const res = data.map(({ id: menuId, ...item }) => {
            let targetData = specsData.data.filter((it) => it.menuId === menuId);
            return {
                menuId,
                ...item,
                specs: [
                    ...targetData
                ]
            }
        })
        return res;
    }
    /**
     * 返回结果：{
            type: {text: "菜品类型0"}
            menuItem: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
     * }
     * @param {*} data 
     */
    function classifyMenuItem(data) {
        let result = getAllMenuType(data);
        result = result.map((item) => ({ type: item, menuItem: [] }));
        for (let item of data) {
            for (let it of result) {
                if (it.type.text === item.type.text) {
                    const { type, ...info } = item;
                    it.menuItem.push({ ...info });
                }
            };
        };
        return result;
    }
    /**
     * 返回结果：[ {menuId,text: "菜品类型0",icon:{...}},...]
     * @param {*} testArr 
     */
    function getAllMenuType(testArr) {
        let types = [];
        for (let item of testArr) {
            /* 在types里找不到，就加进去 */
            if (types.findIndex(theType => theType.text === item.type.text) === -1) {
                types.push({ ...item.type });//{text:xx,icon:xx}
            }
        };
        return types;
    }
}
