import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
	/** Fraction complete, 0–1. Null renders the indeterminate sweep. */
	value: number | null;
	className?: string;
	"aria-label"?: string;
}

/** Thin AppKit-style progress bar. */
export const ProgressBar = ({
	value,
	className,
	"aria-label": ariaLabel,
}: ProgressBarProps) => {
	const { t } = useTranslation();
	const clamped = value === null ? null : Math.min(Math.max(value, 0), 1);

	return (
		<div
			className={clsx(styles.track, className)}
			role="progressbar"
			aria-label={ariaLabel ?? t("Progress")}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clamped === null ? undefined : Math.round(clamped * 100)}
			data-indeterminate={clamped === null || undefined}
		>
			<div
				className={styles.fill}
				style={clamped === null ? undefined : { width: `${clamped * 100}%` }}
			/>
		</div>
	);
};
