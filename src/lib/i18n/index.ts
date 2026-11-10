import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, type TLanguage } from "./language";
import { en } from "./locales/en";
import { vi } from "./locales/vi";

/**
 * Initialized at import time. The resources are inline, so the first paint is
 * already translated — default is Vietnamese, with English as the fallback
 * (keys are English source copy, so untranslated entries render in English).
 */
void i18next.use(initReactI18next).init({
	resources: {
		vi: { translation: vi },
		en: { translation: en },
	},
	lng: DEFAULT_LANGUAGE,
	fallbackLng: "en",
	// Keys are whole English sentences, so neither separator may apply.
	keySeparator: false,
	nsSeparator: false,
	interpolation: { escapeValue: false },
	returnNull: false,
	initAsync: false,
});

/** DOM-free test environments (vitest node) never touch the document. */
const setDocumentLanguage = (language: TLanguage): void => {
	if (typeof document !== "undefined") {
		document.documentElement.lang = language;
	}
};

setDocumentLanguage(DEFAULT_LANGUAGE);

export const applyLanguage = (language: TLanguage): void => {
	setDocumentLanguage(language);
	void i18next.changeLanguage(language);
};

export default i18next;
