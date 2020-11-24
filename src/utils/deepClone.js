export default (obj) => {
    if (typeof obj !== "object") {
        throw "不是object"
    } else if (obj === null) {
        throw "null类型"
    } else {
        return JSON.parse(JSON.stringify(obj))
    }
}


