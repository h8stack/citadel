import { beforeEach, describe, expect, it } from "vitest";
import i18next from "@/lib/i18n";
import { formatBackupDate } from "./copy";

describe("formatBackupDate", () => {
	const now = new Date("2026-10-28T12:00:00");

	beforeEach(async () => {
		await i18next.changeLanguage("en");
	});

	it("leaves out the year when it's this year", () => {
		expect(formatBackupDate("2026-10-12T12:00:00", now)).toBe("October 12");
	});

	it("keeps the year otherwise", () => {
		expect(formatBackupDate("2025-10-12T12:00:00", now)).toBe(
			"October 12, 2025",
		);
	});

	it("has nothing to say without a date", () => {
		expect(formatBackupDate(null, now)).toBeNull();
	});
});
