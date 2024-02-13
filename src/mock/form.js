//编写假数据
function form(method) {
    let res = null;
    switch (method) {
        // 当 method 为 "POST" 时
        case "POST":
            res = {message: "OK!"};
            break;
        // 其他情况下，返回 null
        default:
            res = null;
    }
    return res;
}

module.exports = form;