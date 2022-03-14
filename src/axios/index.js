import { getCityList, getTownList } from "./locations.js";
import { getWeather } from "./weather.js";
import { getCompanyList } from "./stock.js";

/** 依城市代號、鄉鎮區代號取得天氣資訊  */
export const apiGetWeather = getWeather;

/** 取得城市清單  */
export const apiGetCityList = getCityList;
/** 依城市代號取得鄉鎮區清單  */
export const apiGetTownList = getTownList;

/** 取得上次公司清單  */
export const apiGetCompanyList = getCompanyList;
