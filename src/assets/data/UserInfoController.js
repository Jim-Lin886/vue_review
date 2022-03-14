import { integratedFetch } from "./DataUtil.js";
import {
  MsgFormat,
  ERR_E0001,
  ERR_E0002,
  MSG_TYPE_ERROR,
  MSG_POP_CENTER,
  COR_E0000,
  COR_E0002,
  MSG_TYPE_SUCCESS,
  MSG_POP_ASIDE,
} from "./MsgInfo.js";
import {} from "../images/Jim.jpg";

/**
 * 註冊Account資訊
 */
const userInfo = [
  {
    userName: "Jim Lin",
    age: 30,
    gender: "M",
    phone: "08-852741963",
    accountId: "1",
    password: "1",
    img: require("../images/Jim.jpg"),
  },
  {
    userName: "Jim Lin",
    age: 30,
    gender: "M",
    phone: "08-852741963",
    accountId: "Jim",
    password: "Jim",
    img: require("../images/Jim.jpg"),
  },
  {
    userName: "Abby Huang",
    age: 18,
    gender: "F",
    phone: "07-75924155",
    accountId: "Abby",
    password: "Abby",
    img: "",
  },
  {
    userName: "Tony Stark",
    age: 45,
    gender: "M",
    phone: "",
    accountId: "Tony",
    password: "Tony",
    img: "",
  },
];

/**
 * 取得登入的使用者資訊
 * @param {string} id 帳號
 * @param {string} psw 密碼
 * @returns {Promise} 驗證結果
 */
export const getUserByAccountId = (id, psw) => {
  const user = userInfo.filter((item) => item.accountId === id) || null;
  let loginUser = null;
  let msg = null;
  if (user.length === 0) {
    loginUser = null;
    msg = new MsgFormat(ERR_E0001, MSG_TYPE_ERROR, MSG_POP_CENTER).getValue();
  } else if (user[0].password !== psw) {
    loginUser = null;
    msg = new MsgFormat(ERR_E0002, MSG_TYPE_ERROR, MSG_POP_CENTER).getValue();
  } else {
    let okMsg = new MsgFormat(
      COR_E0002,
      MSG_TYPE_SUCCESS,
      MSG_POP_ASIDE
    ).getValue();
    loginUser = { data: user[0], msg: okMsg };
  }
  return integratedFetch(loginUser, msg, 1000);
  // console.log("getUserByAccountId");
};

/**
 * 更新當前登入者的資訊
 * @param {Object} data 將更新的使用者資訊
 * @param {any} store vuex實體
 * @param {number} delay Promise延遲時間
 */
export const updateUserInfo = async (data, store, delay = 1000) => {
  const cloneData = JSON.parse(JSON.stringify(data));
  const msgFmt = new MsgFormat(
    COR_E0000,
    MSG_TYPE_SUCCESS,
    MSG_POP_ASIDE
  ).getValue();
  const result = await integratedFetch({ data: cloneData, msg: msgFmt });
  store.dispatch("commitObjUser", result.data);
  return result;
};
