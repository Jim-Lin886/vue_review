import { parseString, parseStringPromise } from "xml2js";

export const xmlToJson = (xml) => {
  return parseStringPromise(xml);
};

export const msFormat = (sec, t) => {
  console.log("msFormatmsFormat");
  if (typeof sec === "number") {
    // const { t } = useI18n();
    const m = t("label.minuts");
    const s = t("label.second");
    // const m = "minuts";
    // const s = "second";
    return `${Math.floor(sec / 60)} ${m} ${sec % 60} ${s}`;
  }
  return "";
};
