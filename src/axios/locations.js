import axios from "axios";
import { config } from "./weather.js";

import store from "../store";
import { integratedRemoteFetch } from "../assets/data/DataUtil.js";

/**
 * 國土繪測中心Axios實體
 */
const countyInstance = axios.create({
  config,
  baseURL: "https://api.nlsc.gov.tw/other/",
});
// 添加请求拦截器
countyInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
countyInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    integratedRemoteFetch(response, null);
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    store.dispatch("apiSotre/commitApiMsg", error.response);
    integratedRemoteFetch(null, error);

    return Promise.reject(error);
  }
);

/**
 * 透過國土繪測中心Axios實體取得城市清單
 * @returns {Promise} 城市清單結果
 */
export function getCityList() {
  return countyInstance
    .get("/ListCounty")
    .then((res) => res)
    .catch((errer) => errer);
}

/**
 * 透過國土繪測中心Axios實體取得鄉鎮區清單
 * @param {string} cityNo 城市代號
 * @returns {Promise} 鄉鎮區清單結果
 */
export function getTownList(cityNo) {
  return countyInstance
    .get(`/ListTown1/${cityNo}`)
    .then((res) => res)
    .catch((errer) => errer);
}
