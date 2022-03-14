import { ElMessageBox } from "element-plus";
import { ElNotification } from "element-plus";
import {
  MsgFormat,
  ERR_E0000,
  MSG_TYPE_ERROR,
  MSG_POP_CENTER,
  MSG_POP_ASIDE,
} from "./MsgInfo.js";

/**
 * 透過Promise取得本地端資料的統一入口點
 * @param {Object} data 取得資料
 * @param {number} msg 錯誤代碼
 * @param {number} delay 延遲秒數後返回Promise
 */
export const integratedFetch = (data, msg = null, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolveInterceptors(data);
        return resolve(data);
      }
      if (msg) {
        rejectInterceptors(msg);
        return reject(msg);
      }
      const otherErr = new MsgFormat(
        ERR_E0000,
        MSG_TYPE_ERROR,
        MSG_POP_CENTER
      ).getValue();
      rejectInterceptors(otherErr);
      return reject(otherErr);
    }, delay);
  });
};

/**
 * 成功取得本地端資料的攔截器
 * @param {Object} data 取得資料
 */
const resolveInterceptors = (data) => {
  if (data.hasOwnProperty("msg")) {
    procMsg(data.msg);
  }
};

/**
 * 失敗取得本地端資料的攔截器
 * @param {Object} msg 取得資料
 */
const rejectInterceptors = (msg) => {
  if (msg && msg.hasOwnProperty("msgStatus")) {
    procMsg(msg);
  }
};

/**
 * 處理透過Promise取得本地端資料的訊息提示
 * @param {Object} msg 取得資料
 */
const procMsg = (msg) => {
  if (msg.msgStatus == MSG_POP_CENTER) {
    ElMessageBox.alert(msg.msgStr, msg.msgType, {
      type: msg.msgType,
    });
  } else if (msg.msgStatus == MSG_POP_ASIDE) {
    ElNotification({
      message: msg.msgStr,
      type: msg.msgType,
      position: "bottom-right",
    });
  }
};
