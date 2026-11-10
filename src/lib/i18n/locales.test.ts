import { afterAll, describe, expect, it } from "vitest";
import i18next from ".";
import { en } from "./locales/en";
import { vi } from "./locales/vi";

describe("i18n dictionaries", () => {
	it("English mirrors every Vietnamese key", () => {
		expect(Object.keys(en).sort()).toEqual(Object.keys(vi).sort());
	});

	it("has no empty translations", () => {
		for (const [key, value] of Object.entries(vi)) {
			expect(value.trim(), key).not.toBe("");
		}
	});

	it("keeps every interpolation placeholder", () => {
		for (const [key, value] of Object.entries(vi)) {
			const placeholders = key.match(/\{\{\w+\}\}/g) ?? [];
			for (const placeholder of placeholders) {
				expect(value, `${key} is missing ${placeholder}`).toContain(
					placeholder,
				);
			}
		}
	});
});

describe("i18n", () => {
	afterAll(async () => {
		await i18next.changeLanguage("vi");
	});

	it("defaults to Vietnamese and can switch to English", async () => {
		await i18next.changeLanguage("vi");
		expect(i18next.t("Cancel")).toBe("Hủy");
		expect(i18next.t("Settings")).toBe("Cài đặt");
		expect(
			i18next.t("Citadel {{version}} is up to date", { version: "1.2.3" }),
		).toBe("Citadel 1.2.3 đã là bản mới nhất");

		await i18next.changeLanguage("en");
		expect(i18next.t("Cancel")).toBe("Cancel");
		expect(i18next.t("Settings")).toBe("Settings");
		expect(
			i18next.t("Citadel {{version}} is up to date", { version: "1.2.3" }),
		).toBe("Citadel 1.2.3 is up to date");
	});

	it("falls back to the English source copy for unknown keys", async () => {
		await i18next.changeLanguage("vi");
		expect(i18next.t("A string that was never translated")).toBe(
			"A string that was never translated",
		);
	});
});
