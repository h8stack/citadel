/**
 * Mirrors `libcalibre::search::fold_search_text` (crates/libcalibre/src/search.rs):
 * lowercases, strips diacritics and maps `đ` to `d`, so Vietnamese searches
 * match with or without accents. Keep the two implementations in step.
 */
export const foldSearchText = (value: string): string =>
	value
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/đ/g, "d");
