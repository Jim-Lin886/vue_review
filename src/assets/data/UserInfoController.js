import { integratedFetch, ERR_E0001, ERR_E0002 } from "./DataUtil.js";
import {} from "../images/Jim.jpg";

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

export const getUserByAccountId = (id, psw) => {
  let errCode = null;
  const user = userInfo.filter((item) => item.accountId === id) || null;
  if (user.length === 0) {
    errCode = ERR_E0001;
  } else if (user[0].password !== psw) {
    errCode = ERR_E0002;
  }
  return integratedFetch(user, errCode, 500);
};

export const updateUserInfo = (data, store, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch("commitObjUser", data);
      return resolve(JSON.parse(JSON.stringify(data)));
    }, delay);
  });
};
