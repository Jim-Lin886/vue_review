import { parseString, parseStringPromise } from "xml2js";

export const xmlToJson = (xml) => {
  return parseStringPromise(xml);
};

export const msFormat = (sec, t) => {
  if (typeof sec === "number") {
    const m = t("label.minuts");
    const s = t("label.second");
    return `${Math.floor(sec / 60)} ${m} ${sec % 60} ${s}`;
  }
  return "";
};
