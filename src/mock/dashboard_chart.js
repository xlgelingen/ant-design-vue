let random = require("lodash/random");

//编写假数据
function chart(method) {
    let res = null;
    switch (method) {
        // 当 method 为 "GET" 时
        case "GET":
            // 生成一个长度为 6 的数组，数组中的每个元素都是 0 到 100 之间的随机整数
            res = [...new Array(6)].map(() => random(100));
            break;
        // 其他情况下，返回 null
        default:
            res = null;
    }
    return res;
}

module.exports = chart;