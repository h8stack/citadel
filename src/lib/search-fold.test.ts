import { describe, expect, it } from "vitest";
import { foldSearchText } from "./search-fold";

describe("foldSearchText", () => {
	it("folds Vietnamese case and diacritics", () => {
		expect(foldSearchText("Sách Việt Nam")).toBe("sach viet nam");
		expect(foldSearchText("SÁCH")).toBe("sach");
		expect(foldSearchText("Nguyễn Du")).toBe("nguyen du");
		expect(foldSearchText("Đặng Thùy Trâm")).toBe("dang thuy tram");
		expect(foldSearchText("Truyện Kiều")).toBe("truyen kieu");
	});

	it("folds decomposed (NFD) Vietnamese input", () => {
		// "Sách" pasted as NFD: S a + combining acute + c h.
		expect(foldSearchText("Sa\u0301ch")).toBe("sach");
		// "Đặng" decomposed: Đ a + combining breve + combining acute n g.
		expect(foldSearchText("\u0110a\u0306\u0301ng")).toBe("dang");
	});

	it("folds other Latin diacritics used by authors", () => {
		expect(foldSearchText("Brontë")).toBe("bronte");
		expect(foldSearchText("Émile Zola")).toBe("emile zola");
	});

	it("leaves non-Latin scripts searchable as typed", () => {
		expect(foldSearchText("東京")).toBe("東京");
		expect(foldSearchText("мар")).toBe("мар");
	});

	it("is idempotent", () => {
		const folded = foldSearchText("Đặng Thùy Trâm");
		expect(foldSearchText(folded)).toBe(folded);
	});
});
