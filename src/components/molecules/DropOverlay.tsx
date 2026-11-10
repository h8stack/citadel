import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { DropHalo } from "@/components/atoms/DropHalo";
import { CoverFan } from "./CoverFan";
import styles from "./DropOverlay.module.css";

export interface DropOverlayProps {
	visible: boolean;
	/** Renders in place rather than over the window (stories, previews). */
	contained?: boolean;
}

/**
 * Covers the window while books are dragged over it: the library goes behind
 * acrylic glass, a brass light sweeps the edge to say the whole window takes the drop, and a
 * fan of books sits in the middle.
 */
export const DropOverlay = ({
	visible,
	contained = false,
}: DropOverlayProps) => {
	const { t } = useTranslation();
	return (
		<div
			className={clsx(
				styles.overlay,
				contained && styles.contained,
				visible && styles.visible,
			)}
			aria-hidden={!visible}
		>
			<DropHalo />
			<CoverFan size={128} />
			<div className={styles.copy}>
				<p className={styles.title}>{t("Add to Library")}</p>
				<p className={styles.hint}>{t("Drop to upload")}</p>
			</div>
		</div>
	);
};
