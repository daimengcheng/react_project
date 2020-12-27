import MyAxios from "./myAxios"
import { BASE_URL, KEY, PIDU, TOKEN } from '../config/index'
import jsonp from "jsonp";
import { message } from "antd";

// 发起登录请求
export const reqLogin = (username, password) => { return MyAxios.post(`${BASE_URL}/login`, { username, password }) }
// 获取商品列表请求
export const reqGetCategory = (pageNum, pageSize) => { return MyAxios.get(`${BASE_URL}/manage/product/list`, { pageNum, pageSize }) }
// 天气请求（高德地图接口）
export const reqWeather1 = () => { return MyAxios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${PIDU}&key=${KEY}`) }

// 天气请求 另一个接口
// export const reqWeather2 = () => { return MyAxios.get(`https://api.ip138.com/weather/?code=${PIDU}&type=1&token=${TOKEN}`) }

export const reqWeather2 = () => {
    return new Promise((resolve, reject) => {
        jsonp(`https://api.ip138.com/weather/?code=${PIDU}&type=1&token=${TOKEN}`, (err, data) => {
            if (err) {
                message.error('请求天气接口失败，请联系管理员')
            } else {
                // console.log(data)
                let { dayWeather, dayTemp, dayIcon } = data.data
                let weatherObj = { dayWeather, dayTemp, dayIcon }
                resolve(weatherObj)
            }
        })
    })
}