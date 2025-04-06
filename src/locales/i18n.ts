import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


import enMainPage from "../locales/en/mainPage.json";

import ruMainPage from "../locales/ru/mainPage.json";

i18n
    .use(LanguageDetector) // Автоопределение языка
    .use(initReactI18next) // Подключение к React
    .init({
        resources: {
            en: {
                mainPage: enMainPage,
            },
            ru: {
                mainPage: ruMainPage,
            },
        },
        fallbackLng: "en", // Язык по умолчанию
        interpolation: {
            escapeValue: false, // Отключаем экранирование
        },
    });

export default i18n;