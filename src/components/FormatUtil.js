import { parseString, parseStringPromise } from "xml2js";

export const xmlToJson = (xml) => {
  return parseStringPromise(xml);
};
