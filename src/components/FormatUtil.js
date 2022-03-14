import { parseString, parseStringPromise } from "xml2js";

/**
 * 將XML轉成JSON
 * @param {xml} xml XML格式文字
 * @returns {JSON} 轉換JSON
 */
export const xmlToJson = (xml) => {
  return parseStringPromise(xml);
};

/**
 * 傳入秒數加入格式:x分x秒
 * @param {number} sec 秒數
 * @param {any} t i18n方法
 * @returns {string} 格式化結果
 */
export const msFormat = (sec, t) => {
  if (typeof sec === "number") {
    const m = t("label.minuts");
    const s = t("label.second");
    return `${Math.floor(sec / 60)} ${m} ${sec % 60} ${s}`;
  }
  return "";
};
