import { en } from "./locales/en";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { zh } from "./locales/zh";
export type { Messages } from "./locales/en";
export const languages = { en: "English", ja: "日本語", ko: "한국어", zh: "简体中文" } as const;
export type Locale = keyof typeof languages;
export const messages = { en, ja, ko, zh };
export const htmlLanguages = { en: "en", ja: "ja", ko: "ko", zh: "zh-Hans" };
export function isLocale(value: unknown): value is Locale { return typeof value === "string" && Object.hasOwn(languages, value); }
