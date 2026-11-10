//! Unicode-aware text folding for library search.
//!
//! Library search should behave the way Calibre users expect in Vietnamese:
//! typing `sach` finds `Sách`, `nguyen` finds `Nguyễn`, and `dang` finds
//! `Đặng`. SQLite's built-in `LIKE` only folds ASCII case, so search compares
//! a folded key on both sides instead.
//!
//! The TS mirror lives in `src/lib/search-fold.ts`; keep the two in step.

use unicode_normalization::{char::is_combining_mark, UnicodeNormalization};

/// Case-folds, strips diacritics and maps `đ`/`Đ` to `d`. `Đ` becomes `đ`
/// under lowercasing first, so the ASCII mapping only needs the lowercase
/// letter.
pub fn fold_search_text(value: &str) -> String {
    value
        .chars()
        .flat_map(char::to_lowercase)
        .collect::<String>()
        .nfd()
        .filter(|character| !is_combining_mark(*character))
        .map(|character| if character == 'đ' { 'd' } else { character })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::fold_search_text;

    #[test]
    fn folds_vietnamese_diacritics_and_case() {
        assert_eq!(fold_search_text("Sách Việt Nam"), "sach viet nam");
        assert_eq!(fold_search_text("SÁCH"), "sach");
        assert_eq!(fold_search_text("Nguyễn Du"), "nguyen du");
        assert_eq!(fold_search_text("Đặng Thùy Trâm"), "dang thuy tram");
        assert_eq!(fold_search_text("Truyện Kiều"), "truyen kieu");
    }

    #[test]
    fn folds_decomposed_vietnamese_input() {
        // "Sách" as NFD: S a + combining acute c h.
        assert_eq!(fold_search_text("Sa\u{0301}ch"), "sach");
        // "Đặng" decomposed: Đ a + combining breve + combining acute n g.
        assert_eq!(fold_search_text("\u{0110}a\u{0306}\u{0301}ng"), "dang");
    }

    #[test]
    fn folds_other_latin_diacritics() {
        assert_eq!(fold_search_text("Brontë"), "bronte");
        assert_eq!(fold_search_text("Émile Zola"), "emile zola");
    }

    #[test]
    fn leaves_non_latin_text_alone() {
        assert_eq!(fold_search_text("東京"), "東京");
    }
}
