import { useTranslation } from "react-i18next";
import { Checkbox, SearchField, Select } from "@/components/ui";
import {
	type AuthorSortOrderValue,
	authorSortOrderOptions,
	type UseAuthorFiltersReturn,
} from "@/lib/hooks/use-author-filters";
import styles from "./AuthorFilterControls.module.css";

interface AuthorFilterControlsProps {
	filters: UseAuthorFiltersReturn["filters"];
	onSearchChange: (term: string) => void;
	onSortOrderChange: (order: AuthorSortOrderValue) => void;
	onShowOnlyAuthorsWithoutBooksChange: (show: boolean) => void;
}

export const AuthorFilterControls = ({
	filters,
	onSearchChange,
	onSortOrderChange,
	onShowOnlyAuthorsWithoutBooksChange,
}: AuthorFilterControlsProps) => {
	const { t } = useTranslation();
	return (
		<div className={styles.controls}>
			<SearchField
				placeholder={t("Search authors")}
				value={filters.searchTerm}
				onChange={(event) => onSearchChange(event.currentTarget.value)}
				className={styles.search}
			/>

			<Select
				width={150}
				aria-label={t("Sort order")}
				placeholder={t("Sort Order")}
				options={authorSortOrderOptions()}
				value={filters.sortOrder}
				onChange={(value) => onSortOrderChange(value as AuthorSortOrderValue)}
			/>

			<Checkbox
				label={t("No books")}
				checked={filters.showOnlyAuthorsWithoutBooks}
				onCheckedChange={onShowOnlyAuthorsWithoutBooksChange}
			/>
		</div>
	);
};
