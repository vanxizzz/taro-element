import Decimal from "decimal.js"
export default () => {
    Number.prototype.toFixed = function (fixedNum) {
        // /* 思路
        //     (假设保留2位)
        //     12.3456 👉 1234.56 👉 四舍五入1235 👉 1235/100 = 12.35
        // */
        // if (typeof fixedNum !== "number" || fixedNum <= 0) {
        //     return Math.round(this);
        // }
        // let tenPow = Math.pow(10, fixedNum);
        // let newNum = Math.round(this * tenPow) / tenPow;
        // return newNum

        /* 利用库：decimal.js */
        return Number(new Decimal(this).toFixed(fixedNum));
    }
}


