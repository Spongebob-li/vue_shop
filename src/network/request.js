import axios from 'axios'

export function request(config) {
    // 创建一个 axios 的实例
    const instance = axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:5000, // 请求超时时间
    })

    // axios 拦截器
    // 请求拦截
    instance.interceptors.request.use(config => { // 请求成功拦截
        return config  
    }, err => {  // 请求失败拦截
        console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {   // 响应成功拦截
        return res.data
    }, err => {  // 响应成功失败拦截
        console.log(err);
    })

    return instance(config)
}