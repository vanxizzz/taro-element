
export default function (obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
        return obj1 === obj2;
    } else {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

}