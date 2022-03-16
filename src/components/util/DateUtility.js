/**
 * 依傳入日期取得當月第一天的日期,如:x月1日
 * @param {Date} date 指定月份
 * @returns {Date} 回傳日期
 */
export const getfirstDayOnMonth = (date) => {
  if (date instanceof Date) {
    let newDate = new Date(date.getFullYear(), date.getMonth());
    return newDate;
  }
  return null;
};

/**
 * 依傳入日期取得當月最後一天的日期,如:x月31日
 * @param {Date} date 指定月份
 * @returns {Date} 回傳日期
 */
export const getLastDayOnMonth = (date) => {
  if (date instanceof Date) {
    let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return newDate;
  }
  return null;
};

/**
 * 依據格式比對日期a和日期b是否相同
 * @param {Date} a 比對日期
 * @param {Date} b 被比對日期
 * @param {string} format 日期格式
 * @returns {boolean} 比對結果
 */
export const compareDate = (a, b, format = "yyyy/mm/dd") => {
  if (a instanceof Date && b instanceof Date) {
    if (format === "yyyy/mm/dd") {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    }
    return false;
  }
};
