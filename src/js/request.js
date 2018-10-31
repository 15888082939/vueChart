import axios from 'axios';
import Vue from "vue";

const service = axios.create({
     baseURL:process.env.BASE_API,
    timeout:10000,
    "Content-Type":"multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
})
service.interceptors.request.use(
  config =>{
    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)
service.interceptors.response.use(
    response=>{
      return Promise.resolve(response.data);
    },
    error=>{
      return Promise.reject(error);
    }
)
export default service;
