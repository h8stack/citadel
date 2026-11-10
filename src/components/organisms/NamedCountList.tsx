import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchField } from "@/components/ui";
import { useVirtualListRows } from "@/lib/hooks/use-virtual-list-rows";
import { foldSearchText } from "@/lib/search-fold";
import styles from "./NamedCountList.module.css";

/** A named library entity with its linked-book count. */
export interface NamedCount {
	id: number;
	name: string;
	book_count: number;
}

/** Deep-link search params for the library route ("/"). */
export type BookListSearch =
	| { series_id: number }
	| { tag_id: number }
	| { publisher_id: number };

interface NamedCountListProps<T extends NamedCount> {
	/** Rows, already sorted by name. */
	items: T[];
	/**
	 * Names the page's `data-{kind}-header` / `data-{kind}-footer` hooks,
	 * which the list regression tooling (tools/testing) looks for.
	 */
	kind: string;
	/** Singular and plural nouns, e.g. ["tag", "tags"]. */
	noun: readonly [one: string, many: string];
	/** Where a row links to: the library filtered by this entry. */
	toSearch: (item: T) => BookListSearch;
}

/**
 * A searchable, virtualized "name | book count" list that links each row to
 * the library filtered by that entry. Backs the Series, Tags and Publishers
 * pages.
 */
export const NamedCountList = <T extends NamedCount>({
	items,
	kind,
	noun,
	toSearch,
}: NamedCountListProps<T>) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [one, many] = noun;
	const { t } = useTranslation();

	const filteredItems = useMemo(() => {
		const lowerSearch = foldSearchText(searchTerm.trim());
		return items.filter(({ name }) =>
			foldSearchText(name).includes(lowerSearch),
		);
	}, [items, searchTerm]);

	const countNoun = (count: number) => t(count === 1 ? one : many);

	return (
		<div className={styles.page}>
			<div className={styles.filterBar}>
				<SearchField
					placeholder={t("Search {{noun}}", { noun: t(many) })}
					aria-label={t("Search {{noun}}", { noun: t(many) })}
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.currentTarget.value)}
					className={styles.searchInput}
				/>
			</div>

			<div
				{...{ [`data-${kind}-header`]: "" }}
				className={clsx(styles.headerRow, styles.grid)}
			>
				<span className={styles.columnLabel}>{t("Name")}</span>
				<span className={clsx(styles.columnLabel, styles.columnLabelRight)}>
					{t("Books")}
				</span>
			</div>

			<NamedCountRows items={filteredItems} toSearch={toSearch} />

			<div {...{ [`data-${kind}-footer`]: "" }} className={styles.footer}>
				<span className={styles.footerText}>
					{filteredItems.length === items.length
						? t("{{total}} {{noun}}", {
								total: items.length,
								noun: countNoun(items.length),
							})
						: t("{{shown}} of {{total}} {{noun}}", {
								shown: filteredItems.length,
								total: items.length,
								noun: countNoun(items.length),
							})}
				</span>
			</div>
		</div>
	);
};

interface NamedCountRowsProps<T extends NamedCount> {
	items: T[];
	toSearch: (item: T) => BookListSearch;
}

const NamedCountRows = <T extends NamedCount>({
	items,
	toSearch,
}: NamedCountRowsProps<T>) => {
	const { rowsRef, virtualizer, scrollMargin } = useVirtualListRows(items);

	return (
		<div
			ref={rowsRef}
			className={styles.rows}
			style={{ position: "relative", height: virtualizer.getTotalSize() }}
		>
			{virtualizer.getVirtualItems().map((virtualRow) => {
				const item = items[virtualRow.index];
				if (!item) return null;
				return (
					<div
						key={virtualRow.key}
						ref={virtualizer.measureElement}
						data-index={virtualRow.index}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							transform: `translateY(${virtualRow.start - scrollMargin}px)`,
						}}
					>
						<NamedCountRow item={item} search={toSearch(item)} />
					</div>
				);
			})}
		</div>
	);
};

const NamedCountRow = ({
	item,
	search,
}: {
	item: NamedCount;
	search: BookListSearch;
}) => {
	const { t } = useTranslation();
	return (
		// The whole row links to the library filtered by this entry. The hover
		// background, 40px min-height, and the overlay-link positioning live in
		// styles.css (.ctd-author-row / .ctd-author-row-link).
		<div className={clsx("ctd-author-row", styles.row, styles.grid)}>
			{/* Real anchor overlaying the row so middle-click / cmd-click /
			    keyboard all work. The count link sits above it (position:
			    relative + zIndex), so it keeps working without stopPropagation. */}
			<Link
				to="/"
				search={search}
				className="ctd-author-row-link"
				aria-label={t("Show books in {{name}}", { name: item.name })}
			/>

			<span className={styles.cellText}>{item.name}</span>

			<Link to="/" search={search} className={styles.countLink}>
				{item.book_count}
			</Link>
		</div>
	);
};
