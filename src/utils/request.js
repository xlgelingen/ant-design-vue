import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
    return axios(options).then(res => {
        return res;
    }).catch((error) => {
        const { response: { status, statusText } } = error;
        console.log("error了！！")
        notification.error({
            // message:status,
            //单独禁掉第14行的声明了h，但是没有读取的问题
            // eslint-disable-next-line no-unused-vars
            message: h => {
                return <div>
                    请求错误  <span style="color: red">{status}</span> :
                    <div style="color: red">{options.url}</div>
                </div>
            },
            description: statusText
        });
        return Promise.reject(error);
    })
}

export default request;
