import axios from "axios";
import qs from "querystring";
import { message } from "antd";
import nprogress from 'nprogress'
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
const instance = axios.create({
    timeout: 4000
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    nProgress.start()
    const { method, data } = config
    // 若是post请求
    if (method.toLocaleLowerCase() === 'post') {
        // 若传递过来的参数是对象
        if (data instanceof Object) {
            config.data = qs.stringify(data)
        }
    }
    // console.log(config)
    return config
})

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        nprogress.done()
        // 请求若成功走这里
        // console.log(response)
        return response.data
    },
    (error) => {
        nprogress.done()
        if (error.response.status === 401) {
            message.error('身份验证失效，请重新登录')
        } else {
            // 若失败走这里
            message.error(error.message, 2.5)
        }
        // 停止程序
        return new Promise(() => {})
    }
)

export default instance