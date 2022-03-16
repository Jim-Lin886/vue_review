import { integratedFetch } from "./DataUtil.js";
import {
  MsgFormat,
  COR_E0001,
  MSG_TYPE_SUCCESS,
  MSG_POP_ASIDE,
  ERR_E0003,
} from "./MsgInfo";
import { compareDate } from "@/components/util/DateUtility.js";

/** 排程類型:本地  */
export const SCH_KIND_LOCAL = "localMsg";
/** 排程類型:google  */
export const SCH_KIND_GOOGLE = "googleMsg";

/**
 * 處理行事曆排程內容的類別
 */
export class GoogleCalendarFormat {
  constructor(msg) {
    this.kind = msg.kind || "";
    this.id = msg.id || "";
    this.status = msg.status || "";
    this.summary = msg.summary || "";
    this.description = msg.description || "";
    this.location = msg.location || "";
    this.createdDateTime = msg.created || "";
    this.updatedDateTime = msg.updated || "";
    this.startDateTime = msg.start.dateTime || "";
    this.endDateTime = msg.end.dateTime || "";
    this.sequence = Number(msg.sequence) || "";
    this.creatorName = msg.creator.displayName || "";
    this.creatoEmail = msg.creator.email || "";
    this.organizerName = msg.organizer.displayName || "";
    this.organizerEmail = msg.organizer.email || "";
    this.reminders = (msg.reminders.useDefault || "") === true.toString();
  }
}

/**
 * 本地行事曆排程集
 */
export const calendarInfo = [
  {
    createdDateTime: "2022-03-02T07:54:00.000Z",
    creatoEmail: "chimochi723@gmail.com",
    creatorName: "JimLin",
    description: "腳踏車環澄清湖 ",
    endDateTime: "2022-03-03T10:30:00.609Z",
    id: "2tlnm9qd4jdpq9473u6398anl611",
    kind: "calendar#local",
    location: "",
    organizerEmail: "chimochi723@gmail.com",
    organizerName: "",
    reminders: false,
    sequence: "0",
    startDateTime: "2022-03-03T07:30:00.609Z",
    status: "confirmed",
    summary: "腳踏車環澄清湖",
    updatedDateTime: "2022-03-03T07:54:00.609Z",
  },
  {
    createdDateTime: "2022-03-02T13:12:00.000Z",
    creatoEmail: "chimochi723@gmail.com",
    creatorName: "JimLin",
    description: "圖書館找資料",
    endDateTime: "2022-03-03T16:30:00.609Z",
    id: "2tlnm9qd4jdpq9473u6398anl612",
    kind: "calendar#local",
    location: "",
    organizerEmail: "chimochi723@gmail.com",
    organizerName: "",
    reminders: false,
    sequence: "0",
    startDateTime: "2022-03-03T13:30:00.609Z",
    status: "confirmed",
    summary: "圖書館找資料",
    updatedDateTime: "2022-03-03T07:54:00.609Z",
  },
  {
    createdDateTime: "2022-03-10T16:50:29.000Z",
    creatoEmail: "chimochi723@gmail.com",
    creatorName: "JimLin",
    description: "台新銀行開戶",
    endDateTime: "2022-03-16T21:45:00+08:00",
    id: "232ao1sc11l6dhmje30d86la333",
    kind: "calendar#local",
    location: "",
    organizerEmail: "chimochi723@gmail.com",
    organizerName: "",
    reminders: false,
    sequence: 1,
    startDateTime: "2022-03-16T16:30:00+08:00",
    status: "confirmed",
    summary: "台新銀行開戶",
    updatedDateTime: "2022-03-15T16:51:41.597Z",
  },
  {
    createdDateTime: "2022-03-13T16:50:29.000Z",
    creatoEmail: "chimochi723@gmail.com",
    creatorName: "JimLin",
    description: "看牙醫",
    endDateTime: "2022-03-16T19:00:00+08:00",
    id: "232ao1sc11l6dhmje30d86la33",
    kind: "calendar#local",
    location: "",
    organizerEmail: "chimochi723@gmail.com",
    organizerName: "",
    reminders: false,
    sequence: 1,
    startDateTime: "2022-03-16T19:30:00+08:00",
    status: "confirmed",
    summary: "看牙醫",
    updatedDateTime: "2022-03-15T16:51:41.597Z",
  },
];

/**
 * 透過month取得行事曆排程
 * @param {number} month 取得月份
 * @returns {Promise} 功能資訊
 */
export const getCalendarInfo = (month) => {
  let getInfo = null;
  let msgFmt = null;
  if (month === 2) {
    msgFmt = new MsgFormat(
      COR_E0001,
      MSG_TYPE_SUCCESS,
      MSG_POP_ASIDE
    ).getValue();
    getInfo = {
      data: JSON.parse(JSON.stringify(calendarInfo)),
      msg: { ...msgFmt },
    };
  } else {
    msgFmt = new MsgFormat(
      ERR_E0003,
      MSG_TYPE_SUCCESS,
      MSG_POP_ASIDE
    ).getValue();
  }

  return integratedFetch(getInfo, msgFmt, 300);
};

/**
 * 依照傳入類型篩選本地或google排程:CalendarController.SCH_KIND_LOCAL、CalendarController.SCH_KIND_GOOGLE
 * @param {Array} list 排程資料集
 * @returns {Array} 篩選結果
 */
export const filterByScheduleKind = (list, schKind) => {
  if (null === list || list.length === 0) {
    return null;
  }
  if (schKind === SCH_KIND_LOCAL) {
    return list.filter((item) => item.kind.toString().indexOf("local") > -1);
  }
  return list.filter((item) => item.kind.toString().indexOf("local") === -1);
};

/**
 * 依據程資料比對日期是否相同
 * @param {item} item 排程資料
 * @param {Date} b 被比對日期
 * @param {string} format 日期格式
 * @returns {boolean} 比對結果
 */
export const compareCalendarDate = (item, b, format = "yyyy/mm/dd") => {
  if (null === item || null === b) {
    return false;
  }
  let compareStr =
    item.startDateTime.toString().length > 0
      ? item.startDateTime.toString()
      : item.createdDateTime.toString();
  return compareDate(new Date(compareStr), b);
};
