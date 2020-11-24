
function getNumToFixed(obj, dot = 2) {
    const res = {};
    for (let prop in obj) {
        res[prop] = Number(obj[prop]).toFixed(2);
    };
    return res;
}

export const calcItem = (item) => {
    /* 
    {
        discount: 0.5,
        originPrice: 30,
        num: 2,
        specs: [
            {
                type: "辣度",
                item: [
                    {
                        text: "中辣",
                        price: 1
                    },
                    {
                        text: "贼辣",
                        price: 2
                    },
                ]
            }
        ],

    }
    */
    const result = {
        originPrice: 0,//没有打折
        nowPrice: 0,//打折后
    };
    const { originPrice, specs, num, discount } = item;
    let price = originPrice;
    specs.forEach(item => {
        item.item.forEach(it => {
            price += it.price;
        })
    })

/* 
let originPrice = item.originPrice;
        item.specs.forEach(specsItem => {
            specsItem.item.forEach(valueItem => {
                originPrice += valueItem.price;
            })
        })
*/

    result.originPrice = price * num;
    result.nowPrice = price * discount * num;
    return getNumToFixed(result);
}

/**
 * newOriginTotalPrice：计算公式：每个商品的（（单价+规格价）*数量）
 * newNowTotalPrice：计算公式：每个商品的（（单价+规格价）*数量）* discount 
 * newMenuNum：orderMenu里所有的num相加
 * @param {*} orderMenu 
 */
export const calcOrderMenu = (orderMenu = []) => {
    const result = {
        newOriginTotalPrice: 0,//没有打折
        newNowTotalPrice: 0,//打折后
        newMenuNum: 0,
    };
    let newOriginTotalPrice = 0;
    let newNowTotalPrice = 0;
    let newMenuNum = 0;
    orderMenu.forEach(({ specs, originPrice, discount, num }) => {
        originPrice = Number(originPrice);
        discount = Number(discount);
        newMenuNum += num;
        let tempOriginPrice = 0;
        let tempNowPrice = 0;
        specs.forEach(specsItem => {
            specsItem.item.forEach(({ price }) => {
                price = Number(price);
                tempOriginPrice += price;
                tempNowPrice += price;
            })
        })
        /* （单价+规格价）*数量 */
        newOriginTotalPrice += (tempOriginPrice + originPrice) * num;
        /* （（单价+规格价）*数量）* discount */
        newNowTotalPrice += (tempNowPrice + originPrice) * num * discount;
    })
    result.newOriginTotalPrice = Number(newOriginTotalPrice).toFixed(2);
    result.newNowTotalPrice = Number(newNowTotalPrice).toFixed(2);
    result.newMenuNum = newMenuNum;
    return result;
}

/**
 * 计算实付，包括配送费，打包费等等。。
 * @param {*} cart 
 */
export const calcCart = (business) => {
    let { packFee, deliverFee, curCart } = business;
    return Number(packFee + deliverFee + calcOrderMenu(curCart.orderMenu).newNowTotalPrice).toFixed(2);
}