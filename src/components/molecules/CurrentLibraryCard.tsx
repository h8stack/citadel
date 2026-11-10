import type { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextInput } from "@/components/ui";
import {
	type LibraryStatsState,
	useLibraryStats,
} from "@/lib/hooks/use-library-stats";
import type { LibraryPath } from "@/lib/platform/settings/types";
import { renameLibrary } from "@/stores/settings/actions";
import styles from "./CurrentLibraryCard.module.css";

interface CurrentLibraryCardProps {
	library: LibraryPath;
	/** Reveal the library folder in the system file manager; null when the platform can't. */
	onRevealInFileManager: (() => void) | null;
	/** Story seam: overrides the card's own useLibraryStats fetch when set. */
	statsOverride?: LibraryStatsState;
}

const formatContents = (
	stats: { book_count: number; author_count: number },
	t: TFunction,
) => {
	const books = stats.book_count;
	const authors = stats.author_count;
	if (books === 1) {
		return authors === 1
			? t("{{books}} book · {{authors}} author", { books, authors })
			: t("{{books}} book · {{authors}} authors", { books, authors });
	}
	return authors === 1
		? t("{{books}} books · {{authors}} author", { books, authors })
		: t("{{books}} books · {{authors}} authors", { books, authors });
};

/**
 * "Current Library" card: editable name, a Show-in-Finder affordance for the
 * location (never the path as text), and headline contents counts.
 */
export const CurrentLibraryCard = ({
	library,
	onRevealInFileManager,
	statsOverride,
}: CurrentLibraryCardProps) => {
	const { t } = useTranslation();
	const fetchedStats = useLibraryStats(
		library.absolutePath,
		statsOverride === undefined,
	);
	const stats = statsOverride ?? fetchedStats;
	const [draftName, setDraftName] = useState(library.displayName);
	const [nameError, setNameError] = useState<string | null>(null);

	useEffect(() => {
		setDraftName(library.displayName);
		setNameError(null);
	}, [library.displayName]);

	const commitName = async () => {
		try {
			await renameLibrary(library.id, draftName);
			setNameError(null);
		} catch (e) {
			setNameError(e instanceof Error ? e.message : String(e));
		}
	};

	const contents =
		stats.status === "loading"
			? "…"
			: stats.status === "loaded"
				? formatContents(stats.stats, t)
				: null;

	return (
		<div>
			<h4 className={styles.cardTitle}>{t("Current Library")}</h4>
			<div className={styles.card}>
				<div className={styles.row}>
					<span className={styles.rowLabel}>{t("Name")}</span>
					<TextInput
						className={styles.nameInput}
						value={draftName}
						error={nameError}
						aria-label={t("Library name")}
						onChange={(event) => {
							setDraftName(event.currentTarget.value);
							setNameError(null);
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								void commitName();
							} else if (event.key === "Escape") {
								setDraftName(library.displayName);
								setNameError(null);
							}
						}}
						onBlur={() => void commitName()}
					/>
				</div>
				{onRevealInFileManager !== null && (
					<div className={styles.row}>
						<span className={styles.rowLabel}>{t("Location")}</span>
						<Button variant="default" onClick={onRevealInFileManager}>
							{t("Show in Finder")}
						</Button>
					</div>
				)}
				{contents !== null && (
					<div className={styles.row}>
						<span className={styles.rowLabel}>{t("Contents")}</span>
						<span className={styles.rowValue}>{contents}</span>
					</div>
				)}
			</div>
		</div>
	);
};
