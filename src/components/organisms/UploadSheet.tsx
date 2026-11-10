import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { PlusGlyph, UploadGlyph } from "@/components/icons/UploadGlyphs";
import { UploadQueueRow } from "@/components/molecules/UploadQueueRow";
import { UploadReview } from "@/components/molecules/UploadReview";
import {
	Button,
	DialogCloseButton,
	HoldButton,
	IconButton,
} from "@/components/ui";
import { ignorePopoverInteractOutside } from "@/components/ui/popover-interop";
import { useFollowNewest } from "@/lib/hooks/use-follow-newest";
import type { ReviewDeck } from "@/lib/hooks/use-review-deck";
import {
	type QueueItem,
	type QueueSummary,
	UploadPhase,
} from "@/lib/uploads/queue";
import styles from "./UploadSheet.module.css";

export interface UploadSheetProps {
	/** Books are read from this computer rather than uploaded. */
	local?: boolean;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	items: QueueItem[];
	summary: QueueSummary;
	/** Why the queue is holding back, e.g. the server is full. */
	paused?: string;
	/** Review one book at a time instead of showing the whole queue. */
	reviewing: boolean;
	deck: ReviewDeck;
	authorSuggestions?: string[];
	tagSuggestions?: string[];
	onChooseFiles: () => void;
	onReview: (key: string) => void;
	onBackToQueue: () => void;
	onRetry: (key: string) => void;
	onRemove: (key: string) => void;
	onAddAll: () => void;
	onCancelAll: () => void;
}

/**
 * The upload queue and review, as a sheet on wide screens and a full-screen
 * page on phones. Closing it leaves uploads running.
 */
export const UploadSheet = ({
	local = false,
	open,
	onOpenChange,
	items,
	summary,
	paused,
	reviewing,
	deck,
	authorSuggestions,
	tagSuggestions,
	onChooseFiles,
	onReview,
	onBackToQueue,
	onRetry,
	onRemove,
	onAddAll,
	onCancelAll,
}: UploadSheetProps) => {
	const { t } = useTranslation();
	const bodyRef = useRef<HTMLDivElement>(null);
	const firstReady = items.find((item) => item.phase === UploadPhase.ready);
	const cancelHint = local
		? t("Hold to stop adding these books")
		: t("Hold to cancel all uploads");
	useFollowNewest(bodyRef, reviewing ? 0 : items.length);
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content
					className={styles.content}
					aria-describedby={undefined}
					onPointerDownOutside={ignorePopoverInteractOutside}
					onInteractOutside={ignorePopoverInteractOutside}
				>
					{/* Phones get an iOS navigation bar: Done, the title, and +. */}
					<div
						className={styles.header}
						data-reviewing={reviewing || undefined}
					>
						<Dialog.Close asChild>
							<button type="button" className={styles.done}>
								{t("Done")}
							</button>
						</Dialog.Close>
						<Dialog.Title className={styles.title}>
							{reviewing ? t("Review Book") : t("Add Books")}
						</Dialog.Title>
						{!reviewing && summary.ready > 0 && (
							<span className={styles.status}>
								{t("{{ready}} of {{total}} ready", {
									ready: summary.ready,
									total: items.length,
								})}
							</span>
						)}
						{!reviewing && items.length > 0 && (
							<IconButton
								className={styles.addMore}
								aria-label={t("Choose more books")}
								onClick={onChooseFiles}
							>
								<PlusGlyph />
							</IconButton>
						)}
						<Dialog.Close asChild>
							<DialogCloseButton className={styles.close} />
						</Dialog.Close>
					</div>
					<div
						ref={bodyRef}
						className={clsx(styles.body, reviewing && styles.bodyReview)}
					>
						{reviewing ? (
							<UploadReview
								deck={deck}
								local={local}
								authorSuggestions={authorSuggestions}
								tagSuggestions={tagSuggestions}
								onBack={onBackToQueue}
								onDone={() => onOpenChange(false)}
							/>
						) : (
							<>
								{items.length > 0 && (
									<ul
										className={styles.list}
										aria-label={local ? t("Books to add") : t("Uploads")}
									>
										{items.map((item) => (
											<UploadQueueRow
												key={item.key}
												item={item}
												onReview={() => onReview(item.key)}
												onRetry={() => onRetry(item.key)}
												onRemove={() => onRemove(item.key)}
											/>
										))}
									</ul>
								)}
								{paused && (
									<p className={styles.paused} role="status">
										{t(paused)}
									</p>
								)}
								{items.length > 0 ? (
									<>
										<button
											type="button"
											className={styles.dropzone}
											onClick={onChooseFiles}
										>
											<PlusGlyph className={styles.plus} />
											<span>
												{t("Drop more books here or")}{" "}
												<span className={styles.link}>{t("choose files")}</span>
											</span>
										</button>
										<HoldButton
											className={styles.cancelRow}
											label={
												local
													? t("Cancel Adding Books")
													: t("Cancel All Uploads")
											}
											hint={cancelHint}
											onConfirm={onCancelAll}
										/>
									</>
								) : (
									<div className={styles.empty}>
										<UploadGlyph className={styles.emptyGlyph} />
										<p className={styles.emptyTitle}>
											{t("Add books to your library")}
										</p>
										<p className={styles.emptyHint}>
											<span className={styles.wideOnly}>
												{t(
													"Drop books anywhere on the window, or choose them from your files.",
												)}
											</span>
											<span className={styles.narrowOnly}>
												{local
													? t("Choose books from your files to add them.")
													: t("Choose books from your files to upload them.")}
											</span>
										</p>
										<Button
											variant="primary"
											className={styles.choose}
											onClick={onChooseFiles}
										>
											{t("Choose Books")}
										</Button>
									</div>
								)}
							</>
						)}
					</div>
					{/* Outside the scrolling list, so the list can bounce without it. */}
					{!reviewing && items.length > 0 && (
						<div className={styles.footer}>
							{/* Held, not clicked: it throws away everything uploaded. */}
							<HoldButton
								className={styles.cancelAll}
								label={t("Cancel All")}
								hint={cancelHint}
								onConfirm={onCancelAll}
							/>
							<span className={styles.spacer} />
							{/* Reviewing first is the way in; adding everything as the
							    files describe it is the shortcut. */}
							<Button disabled={firstReady === undefined} onClick={onAddAll}>
								{t("Add All")}
							</Button>
							<Button
								variant="primary"
								disabled={firstReady === undefined}
								onClick={() => firstReady && onReview(firstReady.key)}
							>
								{summary.ready === 0
									? t("Review Books")
									: summary.ready === 1
										? t("Review 1 Book")
										: t("Review {{count}} Books", { count: summary.ready })}
							</Button>
						</div>
					)}
					<p className={styles.live} aria-live="polite">
						{summary.active > 0
							? local
								? t(
										summary.active === 1
											? "Reading {{count}} book"
											: "Reading {{count}} books",
										{ count: summary.active },
									)
								: t(
										summary.active === 1
											? "Uploading {{count}} book"
											: "Uploading {{count}} books",
										{ count: summary.active },
									)
							: summary.ready > 0
								? t("{{count}} ready to review", { count: summary.ready })
								: ""}
					</p>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
