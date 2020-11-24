const moment = require("moment");

/* 格式化时间戳 */
/**
 * 实例：formatTimestamp() => 2020年11月16日 09时54分30秒
 * @param {*} timestamp 时间戳
 * @param {*} formatStr 格式化字符串，参考moment.format
 */
export const formatTimestamp = (timestamp, formatStr = "YYYY年MM月DD日 HH时mm分ss秒") => {
    if (!timestamp) {
        timestamp = Date.now();
    }
    return moment(timestamp).format(formatStr);
};
