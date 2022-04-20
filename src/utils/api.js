import axios from 'axios'
import { URL } from './url'
import { GetToken, RemoveToken } from './auth'

const API = axios.create({
    baseURL : URL
})

API.interceptors.request.use(config =>{  //请求拦截器
    const {url} = config
    if(url.match('/user') || url.match('/user/favorite')){
        config.headers.Authorization = GetToken()
    }
    return config
})

API.interceptors.response.use(response =>{     //响应拦截器
    const { status } = response.data
    if(status === 400){
        RemoveToken()
    }  
    return response
})

export { API }