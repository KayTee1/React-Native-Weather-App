import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fi from "./locales/fi.json";
import { getData } from "./util/storage";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    getData("language").then((lang) => {
      if (lang) {
        i18n.changeLanguage(lang).catch((error) => {
          console.error("Failed to change language:", error);
        });
      }
    });
  })
  .catch((error) => {
    console.error("Failed to initialize i18next:", error);
  });

export default i18n;
