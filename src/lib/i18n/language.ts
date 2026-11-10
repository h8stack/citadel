/** Locales Citadel ships. `vi` is the default; `en` mirrors the source copy. */
export const Language = {
	vietnamese: "vi",
	english: "en",
} as const;

export type TLanguage = (typeof Language)[keyof typeof Language];

export const DEFAULT_LANGUAGE: TLanguage = Language.vietnamese;

export const SUPPORTED_LANGUAGES: readonly TLanguage[] = [
	Language.vietnamese,
	Language.english,
];

export const isLanguage = (value: unknown): value is TLanguage =>
	value === Language.vietnamese || value === Language.english;

/** Native names, so the picker stays readable in both locales. */
export const LANGUAGE_NAMES: Record<TLanguage, string> = {
	vi: "Tiếng Việt",
	en: "English",
};
