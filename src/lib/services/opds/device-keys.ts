import type { DeviceKey } from "@/bindings";
import i18next from "@/lib/i18n";

export interface PasswordRun {
	kind: "letter" | "digit" | "symbol";
	text: string;
}

const RUNS = /\p{L}+|\d+|[^\p{L}\d]+/gu;

const runKind = (text: string): PasswordRun["kind"] => {
	if (/^\p{L}/u.test(text)) return "letter";
	return /^\d/.test(text) ? "digit" : "symbol";
};

/** Splits a password into runs of one kind of character, so each can be told
 * apart while it's typed on another device. Joined, the runs are the password. */
export const passwordRuns = (password: string): PasswordRun[] =>
	(password.match(RUNS) ?? []).map((text) => ({ kind: runKind(text), text }));

const DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});

const startOfDay = (date: Date): number =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const lastUsedLabel = (lastUsed: Date, now: Date): string => {
	const days = Math.round(
		(startOfDay(now) - startOfDay(lastUsed)) / 86_400_000,
	);
	if (days === 0) return i18next.t("today");
	if (days === 1) return i18next.t("yesterday");
	return DATE_FORMAT.format(lastUsed);
};

export const deviceKeyUsage = (
	key: DeviceKey,
	now: Date = new Date(),
): string => {
	const added = i18next.t("Added {{date}}", {
		date: DATE_FORMAT.format(new Date(key.createdAt * 1_000)),
	});
	return key.lastUsedAt === null
		? i18next.t("{{added}} · Never used", { added })
		: i18next.t("{{added}} · Last used {{when}}", {
				added,
				when: lastUsedLabel(new Date(key.lastUsedAt * 1_000), now),
			});
};
