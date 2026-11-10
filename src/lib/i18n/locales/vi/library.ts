/** Library browsing: sidebar, grid/list, toolbars, sorting, empty states. */
export const library = {
	// Sidebar
	Library: "Thư viện",
	"All Books": "Tất cả sách",
	Authors: "Tác giả",
	Series: "Bộ sách",
	Tags: "Thẻ",
	Publishers: "Nhà xuất bản",
	Shelves: "Giá sách",
	"Signed in as {{username}} · Sign out":
		"Đã đăng nhập với tên {{username}} · Đăng xuất",
	"Sign out {{username}}": "Đăng xuất {{username}}",
	"Shelf name for {{name}}": "Tên giá sách cho {{name}}",
	"Rename shelf {{name}}": "Đổi tên giá sách {{name}}",
	"Delete shelf {{name}}": "Xóa giá sách {{name}}",

	// Named count lists (Series, Tags, Publishers)
	"Search {{noun}}": "Tìm kiếm {{noun}}",
	Name: "Tên",
	Books: "Sách",
	"{{total}} {{noun}}": "{{total}} {{noun}}",
	"{{shown}} of {{total}} {{noun}}": "{{shown}} trong {{total}} {{noun}}",
	"Show books in {{name}}": "Hiện sách trong {{name}}",

	// Nouns for counts and search fields
	author: "tác giả",
	authors: "tác giả",
	book: "sách",
	books: "sách",
	publisher: "nhà xuất bản",
	publishers: "nhà xuất bản",
	series: "bộ sách",
	tag: "thẻ",
	tags: "thẻ",

	// Books page: sorting and filters
	"Name (A–Z)": "Tên (A–Z)",
	"Name (Z–A)": "Tên (Z–A)",
	"Author (A–Z)": "Tác giả (A–Z)",
	"Author (Z–A)": "Tác giả (Z–A)",
	Author: "Tác giả",
	Tag: "Thẻ",
	Publisher: "Nhà xuất bản",
	"Author: {{name}}": "Tác giả: {{name}}",
	"Series: {{name}}": "Bộ sách: {{name}}",
	"Tag: {{name}}": "Thẻ: {{name}}",
	"Publisher: {{name}}": "Nhà xuất bản: {{name}}",
	"Showing only books by this author": "Chỉ hiện sách của tác giả này",
	"Books are sorted in series order while this filter is active":
		"Sách được sắp xếp theo thứ tự bộ sách khi bộ lọc này đang bật",
	"Showing only books with this tag": "Chỉ hiện sách có thẻ này",
	"Showing only books from this publisher":
		"Chỉ hiện sách của nhà xuất bản này",
	"Search book titles and authors": "Tìm kiếm tên sách và tác giả",
	"Sort order": "Thứ tự sắp xếp",
	"Unread only": "Chỉ sách chưa đọc",
	Unread: "Chưa đọc",

	// Books page: empty states and footer
	"No books match “{{query}}”": "Không có sách nào khớp “{{query}}”",
	"Search looks at titles and authors. Check the spelling, or try fewer words.":
		"Tìm kiếm dựa trên tên sách và tác giả. Kiểm tra chính tả hoặc thử ít từ hơn.",
	"Clear Search": "Xóa tìm kiếm",
	"No books match these filters": "Không có sách nào khớp các bộ lọc này",
	"Every book here is filtered out. Show all books to see the whole library.":
		"Mọi sách ở đây đều bị lọc. Hiện tất cả sách để xem toàn bộ thư viện.",
	"Show all books": "Hiện tất cả sách",
	"Loading books…": "Đang tải sách…",
	"{{total}} books": "{{total}} sách",
	"{{total}} of {{libraryTotal}} books":
		"{{total}} trong {{libraryTotal}} sách",

	// Save as shelf
	"Save as shelf…": "Lưu thành giá sách…",
	"Save as shelf": "Lưu thành giá sách",
	"Shelf name": "Tên giá sách",
	"Saves the current filters: {{summary}}.":
		"Lưu các bộ lọc hiện tại: {{summary}}.",
	"this view's filter": "bộ lọc của chế độ xem này",
	'search "{{query}}"': 'tìm kiếm "{{query}}"',
	"sorted by {{order}}": "sắp xếp theo {{order}}",
	"no search": "không có tìm kiếm",
	"hiding read books": "ẩn sách đã đọc",
	"showing read books": "hiện sách đã đọc",

	// Authors page
	"Delete author": "Xóa tác giả",
	'Are you sure you want to delete "{{name}}"? This cannot be undone.':
		'Bạn có chắc muốn xóa "{{name}}"? Không thể hoàn tác thao tác này.',
	"Couldn't delete {{name}}: {{error}}": "Không thể xóa {{name}}: {{error}}",
	Dismiss: "Bỏ qua",
	"No authors match “{{query}}”": "Không có tác giả nào khớp “{{query}}”",
	"Check the spelling, or search by surname.":
		"Kiểm tra chính tả hoặc tìm theo họ.",
	"Every author has books": "Mọi tác giả đều có sách",
	"No author is left without a book in this library.":
		"Không còn tác giả nào chưa có sách trong thư viện này.",
	"Show all authors": "Hiện tất cả tác giả",
	"Sort name": "Tên sắp xếp",
	"No sort name": "Không có tên sắp xếp",
	"Show books by {{name}}": "Hiện sách của {{name}}",
	"Edit {{name}}": "Chỉnh sửa {{name}}",
	"Delete {{name}}": "Xóa {{name}}",
	"Edit author": "Chỉnh sửa tác giả",
	"Full name": "Tên đầy đủ",
	"How the author's name is displayed": "Cách tên tác giả được hiển thị",
	"Authors are sorted alphabetically by this name":
		"Tác giả được sắp xếp theo bảng chữ cái dựa trên tên này",
	"Name is required": "Cần nhập tên",
	"Sort name is required": "Cần nhập tên sắp xếp",

	// Libraries card
	Libraries: "Thư viện",
	"Reveal in Finder": "Hiện trong Finder",
	"Library name for {{name}}": "Tên thư viện cho {{name}}",
	"Adding Library…": "Đang thêm thư viện…",
	"Add Library…": "Thêm thư viện…",
	"Open a Calibre library folder from your Mac":
		"Mở thư mục thư viện Calibre trên máy Mac của bạn",

	// Empty library
	"Your library is empty": "Thư viện của bạn đang trống",
	"Books you add are copied into your library at {{path}}.":
		"Sách bạn thêm sẽ được sao chép vào thư viện tại {{path}}.",
	"Add a book to this library, or switch to an existing Calibre library.":
		"Thêm sách vào thư viện này hoặc chuyển sang thư viện Calibre hiện có.",
	"Switch to an existing Calibre library to get started.":
		"Chuyển sang thư viện Calibre hiện có để bắt đầu.",
	"Add Book…": "Thêm sách…",
	"Show in Finder": "Hiện trong Finder",
	"Switch library…": "Chuyển thư viện…",

	// Add book button
	"Add Book": "Thêm sách",
} satisfies Record<string, string>;
