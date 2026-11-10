import { useEffect } from "react";
import { applyLanguage } from ".";
import type { TLanguage } from "./language";

/** Keeps i18next and the document's `lang` in step with the setting. */
export const useApplyLanguage = (language: TLanguage): void => {
	useEffect(() => {
		applyLanguage(language);
	}, [language]);
};
