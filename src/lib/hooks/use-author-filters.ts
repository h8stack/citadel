import { useMemo, useState } from "react";
import type { LibraryAuthor } from "@/bindings";
import { sortAuthors } from "@/lib/domain/author";
import i18next from "@/lib/i18n";
import { foldSearchText } from "@/lib/search-fold";

export const AuthorSortOrder = {
	nameAz: "name-asc",
	nameZa: "name-desc",
} as const;

export type AuthorSortOrderValue =
	(typeof AuthorSortOrder)[keyof typeof AuthorSortOrder];

export const AuthorSortOrderLabel: Record<
	keyof typeof AuthorSortOrder,
	string
> = {
	nameAz: "Name (A–Z)",
	nameZa: "Name (Z–A)",
} as const;

export const authorSortOrderLabel = (
	order: keyof typeof AuthorSortOrder,
): string => i18next.t(AuthorSortOrderLabel[order]);

/** Built at call time so a language change is picked up. */
export const authorSortOrderOptions = (): {
	value: AuthorSortOrderValue;
	label: string;
}[] =>
	Object.entries(AuthorSortOrder).map(([key, value]) => ({
		value,
		label: authorSortOrderLabel(key as keyof typeof AuthorSortOrder),
	}));

export interface AuthorFilters {
	searchTerm: string;
	sortOrder: AuthorSortOrderValue;
	showOnlyAuthorsWithoutBooks: boolean;
}

export interface UseAuthorFiltersReturn {
	filters: AuthorFilters;
	setSearchTerm: (term: string) => void;
	setSortOrder: (order: AuthorSortOrderValue) => void;
	setShowOnlyAuthorsWithoutBooks: (show: boolean) => void;
	filteredAuthors: LibraryAuthor[];
}

export const useAuthorFilters = (
	authors: LibraryAuthor[],
): UseAuthorFiltersReturn => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState<AuthorSortOrderValue>(
		AuthorSortOrder.nameAz,
	);
	const [showOnlyAuthorsWithoutBooks, setShowOnlyAuthorsWithoutBooks] =
		useState(false);

	const filteredAuthors = useMemo(() => {
		let result = [...authors];

		if (searchTerm.trim()) {
			const searchLower = foldSearchText(searchTerm.trim());
			result = result.filter(
				(author) =>
					foldSearchText(author.name).includes(searchLower) ||
					foldSearchText(author.sortable_name ?? "").includes(searchLower),
			);
		}

		if (showOnlyAuthorsWithoutBooks) {
			result = result.filter((author) => author.book_count === 0);
		}

		result.sort(sortAuthors);

		if (sortOrder === AuthorSortOrder.nameZa) {
			result.reverse();
		}

		return result;
	}, [authors, searchTerm, sortOrder, showOnlyAuthorsWithoutBooks]);

	return {
		filters: {
			searchTerm,
			sortOrder,
			showOnlyAuthorsWithoutBooks,
		},
		setSearchTerm,
		setSortOrder,
		setShowOnlyAuthorsWithoutBooks,
		filteredAuthors,
	};
};
