// import area from "./area"
const area = require("./area")
let test = ({ code } = { code: null }) => {
    if (!code) {
        return;
    }
    let { type, prefix } = getType(code);
    if (type === "county") {
        return null;
    } else if (type === "province") {
        type = "city"
    } else if (type === "city") {
        type = "county"
    }

    const resultArr = [];
    for (let prop in area[type]) {
        if (prop.startsWith(prefix)) {
            resultArr.push({ name: area[type][prop], code: prop })
        }
    };
    return resultArr;
}
console.log(test({ code: "440000" }))
function getType(code) {
    let type;
    let prefix;
    if (/[0-9]{4}$/.exec(code)[0] === "0000") {
        type = "province";
        prefix = code.substr(0, 2);
    } else if (/[0-9]{2}$/.exec(code)[0] === "00") {
        type = "city"
        prefix = code.substr(0, 4);
    } else {
        prefix = code;
        type = "county"
    }
    return { type, prefix };
}