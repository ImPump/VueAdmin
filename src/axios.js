import axios from "axios";
import Element from 'element-ui'
import router from "./router";

// axios.defaults.baseURL =  "http://localhost:8081"        //出现跨域问题，可在后端解决

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 请求拦截器
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
})

// 返回结果
request.interceptors.response.use(response => {
    
    let res = response.data
    console.log('response')
    console.log(res)

    if (res.code === 200) {
        return response
    } else {
        Element.Message.error(!res.msg ? '系统异常！' : res.msg , { duration: 3 * 1000 })
        return Promise.reject(response.data.msg)
    }
},
    // 异常状态码
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401) {
            router.push('/login')
        }
        Element.Message.error(error.message, { duration: 3 * 1000 })
        return Promise.reject(error)
    }
)


export default request