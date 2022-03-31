/** 訊息類型:成功 */
export const MSG_TYPE_SUCCESS = "success";
/** 訊息類型:警告 */
export const MSG_TYPE_WARN = "warning";
/** 訊息類型:錯誤 */
export const MSG_TYPE_ERROR = "error";
/** 訊息類型:資訊 */
export const MSG_TYPE_INFO = "info";

/** 訊息位置:中間  */
export const MSG_POP_CENTER = "centerPop";
/** 訊息位置:右側邊  */
export const MSG_POP_ASIDE = "asidePop";

/** 成功內容:Save success  */
export const COR_E0000 = "C0000";
/** 成功內容:Query success  */
export const COR_E0001 = "C0001";
/** 成功內容:Logined success  */
export const COR_E0002 = "C0002";
/** 錯誤內容:Occurred error  */
export const ERR_E0000 = "E0000";
/** 錯誤內容:Account is not found  */
export const ERR_E0001 = "E0001";
/** 錯誤內容Password is Error  */
export const ERR_E0002 = "E0002";
/** 錯誤內容No data found  */
export const ERR_E0003 = "E0003";

/**
 * 處理訊息內容的類別
 */
export class MsgFormat {
  /**
   * @param {string} msgCode 取得資料
   * @param {string} msgType 訊息類型
   * @param {string} msgStatus 訊息位置
   * @param {string} msgStr 顯示內容
   */
  constructor(msgCode, msgType, msgStatus, msgStr = "") {
    this.msgCode = msgCode;
    this.msgType = msgType;
    this.msgStatus = msgStatus;
    this.msgStr = msgStr;
  }

  /**
   * @returns {Object | null} 取得訊息內容
   */
  getValue() {
    if (this.msgInfo.hasOwnProperty(this.msgCode)) {
      let msgInfo = { ...this.msgInfo[this.msgCode] };
      msgInfo.msgType = this.msgType;
      msgInfo.msgStatus = this.msgStatus;
      if (typeof this.msgStr === "string" && this.msgStr !== "") {
        msgInfo.msgStr = this.msgStr;
      }
      return msgInfo;
    }
    return null;
  }

  /** 訊息內容資料集 */
  msgInfo = {
    C0000: {
      msgCode: "C0000",
      msgStr: "Save success",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    C0001: {
      msgCode: "C0001",
      msgStr: "Query success",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    C0002: {
      msgCode: "C0002",
      msgStr: "Logined success",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    E0000: {
      msgCode: "E0000",
      msgStr: "Occurred error",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    E0001: {
      msgCode: "E0001",
      msgStr: "Account is not found",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    E0002: {
      msgCode: "E0002",
      msgStr: "Password is Error",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
    E0003: {
      msgCode: "E0003",
      msgStr: "No data found",
      msgType: MSG_TYPE_ERROR,
      msgStatus: MSG_POP_CENTER,
    },
  };
}
