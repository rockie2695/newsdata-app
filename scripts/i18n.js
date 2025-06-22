import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      home: "Home",
      top: "Top",
      business: "Business",
      entertainment: "Entertainment",
      technology: "Technology",
      sports: "Sports",
      details: "Details",
      originalLink: "Original Link",
      share: "Share",
      on: "On",
      search: "Search",
      searchPlaceholder: "Search (comma can split words)",
      news: "News",
    },
  },
  "zh-HK": {
    translation: {
      home: "首頁",
      top: "焦點",
      business: "財經",
      entertainment: "娛樂",
      technology: "科技",
      sports: "體育",
      details: "詳情",
      originalLink: "原文連結",
      share: "分享",
      on: "在",
      search: "搜尋",
      searchPlaceholder: "搜尋 (逗號可以分隔單字)",
      news: "新聞",
    },
  },
};
//only support en and zh-HK
const locales = getLocales();
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: (locales[0]?.languageTag || "zh-HK").includes("zh") ? "zh-HK" : "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    supportedLngs: ["en", "zh-HK"],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
