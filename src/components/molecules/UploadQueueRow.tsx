import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { StagedCover } from "@/components/atoms/StagedCover";
import { UploadProgressRing } from "@/components/atoms/UploadProgressRing";
import {
	AlertGlyph,
	ChevronRightGlyph,
	XmarkGlyph,
} from "@/components/icons/UploadGlyphs";
import { Button, IconButton, Spinner } from "@/components/ui";
import i18next from "@/lib/i18n";
import { hasSource, type QueueItem, UploadPhase } from "@/lib/uploads/queue";
import styles from "./UploadQueueRow.module.css";

export interface UploadQueueRowProps {
	item: QueueItem;
	onReview?: () => void;
	onRetry?: () => void;
	onRemove?: () => void;
}

const subtitle = (item: QueueItem): string => {
	switch (item.phase) {
		case UploadPhase.waiting:
			return i18next.t("Waiting");
		case UploadPhase.uploading:
			return i18next.t("Uploading…");
		case UploadPhase.reading:
			return i18next.t("Reading book…");
		case UploadPhase.adding:
			return i18next.t("Adding…");
		case UploadPhase.added:
			return i18next.t("Added");
		case UploadPhase.ready:
			return (
				item.message ??
				(item.book?.authorNames.join(", ") || i18next.t("Ready to add"))
			);
		case UploadPhase.failed:
		case UploadPhase.rejected:
			return item.message ?? i18next.t("Couldn't add this file");
	}
};

const Thumbnail = ({ item }: { item: QueueItem }) => {
	if (item.phase === UploadPhase.failed || item.phase === UploadPhase.rejected)
		return (
			<span className={clsx(styles.thumb, styles.problem)}>
				<AlertGlyph />
			</span>
		);
	if (item.book)
		return (
			<StagedCover
				className={styles.thumb}
				coverUrl={item.coverUrl}
				seed={item.book.title}
			/>
		);
	return <span className={clsx(styles.thumb, styles.pending)} />;
};

/** One file in the upload queue, with what's happening to it and what you can do. */
export const UploadQueueRow = ({
	item,
	onReview,
	onRetry,
	onRemove,
}: UploadQueueRowProps) => {
	const { t } = useTranslation();
	const problem =
		item.phase === UploadPhase.failed ||
		item.phase === UploadPhase.rejected ||
		(item.phase === UploadPhase.ready && item.message !== undefined);
	return (
		<li className={styles.row} data-phase={item.phase}>
			<Thumbnail item={item} />
			<div className={styles.text}>
				<span className={styles.name}>{item.name}</span>
				<span className={clsx(styles.subtitle, problem && styles.danger)}>
					{subtitle(item)}
				</span>
			</div>
			<div className={styles.trailing}>
				{item.phase === UploadPhase.uploading && (
					<UploadProgressRing
						progress={item.size ? item.sentBytes / item.size : 0}
						onStop={onRemove}
						stopLabel={t("Stop uploading {{name}}", { name: item.name })}
					/>
				)}
				{item.phase === UploadPhase.reading && (
					// Busy, but still yours to drop: the spinner turns into an ×
					// under the pointer, like the upload ring.
					<button
						type="button"
						className={styles.busyCancel}
						aria-label={t("Stop reading {{name}}", { name: item.name })}
						onClick={onRemove}
					>
						<Spinner size={18} className={styles.busySpinner} />
						<XmarkGlyph className={styles.busyX} />
					</button>
				)}
				{item.phase === UploadPhase.adding && (
					<Spinner size={18} aria-label={subtitle(item)} />
				)}
				{item.phase === UploadPhase.ready && (
					// On phones the whole row taps through to review (the button
					// stretches over it) and shows a chevron instead.
					<Button
						className={styles.review}
						onClick={onReview}
						aria-label={t("Review {{name}}", { name: item.name })}
					>
						<span className={styles.reviewLabel}>{t("Review")}</span>
						<ChevronRightGlyph className={styles.chevron} />
					</Button>
				)}
				{item.phase === UploadPhase.failed && hasSource(item) && (
					<Button onClick={onRetry}>{t("Try Again")}</Button>
				)}
				{item.phase === UploadPhase.rejected ? (
					<Button variant="subtle" onClick={onRemove}>
						{t("Dismiss")}
					</Button>
				) : (
					// Waiting and failed files show their ×; reading and uploading
					// ones show it on hover; adding (the final write to the
					// library) runs to the end.
					(item.phase === UploadPhase.waiting ||
						item.phase === UploadPhase.failed) && (
						<IconButton
							aria-label={t("Remove {{name}}", { name: item.name })}
							onClick={onRemove}
						>
							<XmarkGlyph />
						</IconButton>
					)
				)}
			</div>
		</li>
	);
};
