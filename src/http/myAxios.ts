import axios from "axios";
import { ElMessage } from "element-plus";
import { h } from "vue";
import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

function getErrMessage(status: number) {
  return statusTextMap[status] || "发生未知错误";
}
const statusTextMap: Record<number, string> = {
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作",
  401: "登录失效，请重新登录",
  403: "用户得到授权，但是访问是被禁止的",
  404: "网络请求目标不存在",
  406: "请求的格式不可得",
  410: "请求的资源被永久删除，且不会再得到的",
  422: "当创建一个对象时，发生一个验证错误",
  500: "服务器发生错误，请检查服务器",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时",
};
const APIURL = import.meta.env.VITE_TEST_URL;

// createAxiosAPI
const myaxios = axios.create({
  baseURL: APIURL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
myaxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = "token";
    // console.log(config);
    return config;
  },
  (err: any) => {
    ElMessage.error(err.message);
  }
);
myaxios.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response);
    return response;
  },
  (err: any) => {
    let {
      response: { status },
    } = err;
    // console.log(status);
    ElMessage.error(getErrMessage(status));
  }
);
export default myaxios;
