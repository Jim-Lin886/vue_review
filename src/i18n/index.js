import { createI18n } from "vue-i18n";
import tw from "./tw.json";
import en from "./en.json";

export const item_tw = { label: "繁體中文", value: "zh_tw" };
export const item_en = { label: "English", value: "en_us" };

/** i18n實體 */
const i18n = createI18n({
  //   legacy: false,
  locale: "zh_tw", // 設定語言
  fallbackLocale: "zh_tw", // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    zh_tw: tw,
    en_us: en,
  },
});

export default i18n;
