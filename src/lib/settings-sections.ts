import i18next from "@/lib/i18n";

/** The sections of the web app's Settings page. */
export const SettingsSection = {
	general: "general",
	metadata: "metadata",
} as const;
export type TSettingsSection =
	(typeof SettingsSection)[keyof typeof SettingsSection];

/**
 * Each section's heading. The getters resolve through i18next when read, not
 * at module load, so a language change reaches every consumer (including
 * non-component ones) without them importing the dictionary themselves.
 */
export const SETTINGS_SECTION_LABELS: Record<TSettingsSection, string> = {
	get general() {
		return i18next.t("General");
	},
	get metadata() {
		return i18next.t("Sources");
	},
};
