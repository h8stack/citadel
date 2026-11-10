import type { DatabaseProblemKind, RecoveryStep } from "@/bindings";
import i18next from "@/lib/i18n";

/**
 * Every word about citadel.db problems: the recovery screen and the notice
 * after a damaged database was restored. Which steps appear for which problem
 * is decided by the backend (src-tauri/src/recovery.rs); only the wording
 * lives here.
 *
 * Copy is read through getters (or functions for interpolated text) so the
 * active language applies at render time rather than at module load.
 */
export const PROBLEM_COPY: Record<
	DatabaseProblemKind,
	{ title: string; lede: string }
> = {
	damaged: {
		get title() {
			return i18next.t("There’s a problem opening Citadel");
		},
		get lede() {
			return i18next.t(
				"Your books are safe, but Citadel lost track of your libraries.",
			);
		},
	},
	newerVersion: {
		get title() {
			return i18next.t("Citadel needs to be updated");
		},
		get lede() {
			return i18next.t("A newer version of Citadel was used on this Mac.");
		},
	},
	migrationFailed: {
		get title() {
			return i18next.t("There’s a problem opening Citadel");
		},
		get lede() {
			return i18next.t(
				"Your books and settings are safe. An update may fix this.",
			);
		},
	},
	migrationInterrupted: {
		get title() {
			return i18next.t("There’s a problem opening Citadel");
		},
		get lede() {
			return i18next.t(
				"Your books and settings are safe. Citadel was interrupted while updating.",
			);
		},
	},
	unreadable: {
		get title() {
			return i18next.t("There’s a problem opening Citadel");
		},
		get lede() {
			return i18next.t(
				"Citadel couldn’t read its settings. Try restarting your Mac, then open Citadel again.",
			);
		},
	},
};

type DateText = string | null;

export const STEP_COPY: Record<
	Exclude<RecoveryStep, "quit">,
	{ title: (date: DateText) => string; description?: string }
> = {
	update: {
		title: () => i18next.t("Update Citadel"),
	},
	restoreBackup: {
		title: (date) =>
			date
				? i18next.t("Restore from {{date}}", { date })
				: i18next.t("Restore a previous version"),
		get description() {
			return i18next.t("Libraries added since then will need re-adding.");
		},
	},
	startFresh: {
		title: () => i18next.t("Find My Libraries"),
		get description() {
			return i18next.t("Reading apps will need a new sharing password.");
		},
	},
	tryAgain: {
		title: () => i18next.t("Try Again"),
	},
};

export const QUIT_LABEL = "Quit Citadel";
export const WORKING_LABEL = "Working…";
export const FAILED_PREFIX = "That didn’t work:";

/** Shown when an update step finds nothing newer to install. */
export const noUpdateMessage = (): string =>
	i18next.t("There isn’t a newer version of Citadel yet.");

/** Shown once the app opens on a backup that replaced a damaged database. */
export const RESTORED_NOTICE = {
	get title() {
		return i18next.t("Previous version restored");
	},
	message: (date: DateText) =>
		date
			? i18next.t(
					"To recover from a problem, Citadel went back to your settings from {{date}}. Re-add any libraries you’ve added since.",
					{ date },
				)
			: i18next.t(
					"To recover from a problem, Citadel went back to your settings. Re-add any libraries you’ve added since.",
				),
};

/** "October 12" this year, "October 12, 2025" otherwise. */
export const formatBackupDate = (
	createdAt: string | null,
	now: Date = new Date(),
): DateText => {
	if (!createdAt) return null;
	const date = new Date(createdAt);
	return date.toLocaleDateString(
		i18next.language === "vi" ? "vi-VN" : "en-CA",
		date.getFullYear() === now.getFullYear()
			? { month: "long", day: "numeric" }
			: { dateStyle: "long" },
	);
};
