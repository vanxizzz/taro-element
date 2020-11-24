import createResponse from "../utils/createResponse"
import { SUCCESS, FAIL } from "./constance"
import delay from "../utils/delay"
/* 
    {
        assignObj: {
            name: "xxx"
        },
        key: {
            name: "phone",
            text: "手机"
        },
        database: {
            data: getMockData(),
            maxId: i,
            change(value) {
                this.data = value;
            },
            getOnlyId() {
                return this.maxId
            },
            setOnlyId() {
                this.maxId += 1;
            }
        },
        tableName: "user"
        
    }
*/

export default function ({ assignObj, key, database, tableName }) {

    return {
        theCreate,
        theUpdate,
        theSelect,
        theDelete
    }

    function assignDefault(info) {
        return {
            ...assignObj,
            ...info
        }
    }

    async function theCreate(obj) {
        await delay(1000);
        const response = createResponse();
        let tempIndex = database.data.findIndex(item => item[key.name] === obj[key.name]);
        if (tempIndex !== -1) {
            /* 账号存在 */
            response.status = FAIL;
            response.statusText = `${key.text} 已存在 `
        } else {
            let newId = database.getOnlyId();
            let newData = {
                id: newId,
                ...assignDefault(obj)
            };
            database.change([
                ...database.data,
                newData
            ])
            database.setOnlyId();
            response.status = SUCCESS;
            response.statusText = `create ${tableName} ok~~`;
            response.data = newData;
        }
        return response;
    }


    async function theUpdate(obj) {
        await delay(1000);
        const response = createResponse();
        let tempIndex = database.data.findIndex(item => item[key.name] === obj[key.name]);
        if (tempIndex === -1) {
            response.status = FAIL;
        } else {
            const newData = {
                ...database.data[tempIndex],
                ...obj,
            }
            database.change(database.data.map(item => {
                if (item[key.name] === obj[key.name]) {
                    return newData;
                }
                return item;
            }))

            response.data = newData;
            response.status = SUCCESS;
            response.statusText = `update ${tableName} ok~~`
        }
        return response;
    }

    /* 
    const response = await selectUser(this.phone);
    */

    async function theSelect(theKey) {
        await delay(1000);
        const response = createResponse();
        let tempIndex = database.data.findIndex(item => item[key.name] === theKey);
        if (tempIndex === -1) {
            response.status = FAIL;
            response.statusText = `key：${key.text}，值：${theKey} 不存在`
        } else {
            response.data = {
                ...database.data[tempIndex]
            }
            response.status = SUCCESS;
            response.statusText = `select ${tableName} ok~~`
        }

        return response;
    }


    async function theDelete(theKey) {
        await delay(1000);
        const response = createResponse();
        let tempIndex = database.data.findIndex(item => item[key.name] === theKey);

        if (tempIndex === -1) {
            response.statusText = `${theKey} 不存在`
            response.status = FAIL;
        } else {
            database.change(database.data.map(item => item[key.name] !== theKey))
            response.status = SUCCESS;
            response.statusText = `delete ${tableName} ok~~`;
        }
        return response;
    }
}