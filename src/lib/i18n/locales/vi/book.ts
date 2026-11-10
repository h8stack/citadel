/** Book details and editing: detail pane, forms, metadata lookups. */
export const book = {
	// Book editor
	"All Books": "Tất cả sách",
	Undo: "Hoàn tác",
	"Saving…": "Đang lưu…",
	Saved: "Đã lưu",
	Dismiss: "Bỏ qua",
	Title: "Tựa đề",
	"Sort title": "Tựa đề sắp xếp",
	Series: "Bộ sách",
	"Not in a series": "Không thuộc bộ sách",
	"Number in series": "Số trong bộ",
	Authors: "Tác giả",
	"Search or add author": "Tìm hoặc thêm tác giả",
	Tags: "Thẻ",
	"Search or add tag": "Tìm hoặc thêm thẻ",
	Genres: "Thể loại",
	"Suggested subjects:": "Chủ đề gợi ý:",
	"Suggested genres:": "Thể loại gợi ý:",
	"From {{source}}:": "Từ {{source}}:",
	"Add all {{total}}": "Thêm tất cả {{total}}",
	Languages: "Ngôn ngữ",
	"Search or add language": "Tìm hoặc thêm ngôn ngữ",
	Identifiers: "Mã định danh",
	"Add identifier": "Thêm mã định danh",
	"Type, e.g. ISBN or Goodreads": "Nhập, ví dụ ISBN hoặc Goodreads",
	"Open record in browser": "Mở bản ghi trong trình duyệt",
	"Remove identifier": "Gỡ mã định danh",
	"Couldn't save the identifier": "Không lưu được mã định danh",
	"Couldn't remove the identifier": "Không gỡ được mã định danh",
	"Couldn't add the identifier": "Không thêm được mã định danh",
	"Custom columns": "Cột tùy chỉnh",
	"column {{id}}": "cột {{id}}",
	"Search or add value": "Tìm hoặc thêm giá trị",
	Unset: "Chưa đặt",
	Metadata: "Siêu dữ liệu",
	"Find Book Details…": "Tìm thông tin sách…",
	Description: "Mô tả",
	Preview: "Xem trước",
	"No description. Choose Edit to add one.":
		"Chưa có mô tả. Chọn Chỉnh sửa để thêm.",
	"Couldn't save: {{error}}": "Không lưu được: {{error}}",
	"Couldn't add the author {{name}}": "Không thể thêm tác giả {{name}}",

	// Deleting a book
	"Delete book": "Xóa sách",
	"Delete Book…": "Xóa sách…",
	"Deleting…": "Đang xóa…",
	"This book will be removed from Citadel and its files moved to the Trash. You can recover the files, then re-import the book.":
		"Sách này sẽ bị xóa khỏi Citadel và các tệp được chuyển vào Thùng rác. Có thể khôi phục các tệp rồi nhập lại sách.",
	"Move to Trash": "Chuyển vào Thùng rác",
	"Book removed, files not moved to Trash":
		"Đã xóa sách, nhưng chưa chuyển được tệp vào Thùng rác",
	"The book was removed from your library, but its files could not be moved to the Trash. The files remain in your library folder at the locations below. You can move them manually or re-import them.":
		"Sách đã bị xóa khỏi thư viện nhưng không thể chuyển các tệp vào Thùng rác. Các tệp vẫn nằm trong thư mục thư viện ở các vị trí bên dưới. Có thể tự di chuyển hoặc nhập lại chúng.",
	"This book and its files will be deleted from the library. This can't be undone.":
		"Sách này và các tệp sẽ bị xóa khỏi thư viện. Không thể hoàn tác.",
	"Delete Permanently": "Xóa vĩnh viễn",
	"Book removed, files not deleted": "Đã xóa sách, nhưng chưa xóa được tệp",
	"The book was removed from the library, but some of its files could not be deleted. They remain in the library folder at the locations below.":
		"Sách đã bị xóa khỏi thư viện nhưng một số tệp không thể xóa. Chúng vẫn nằm trong thư mục thư viện ở các vị trí bên dưới.",
	"Delete “{{title}}”?": "Xóa “{{title}}”?",

	// Book drawer
	and: "và",
	by: "bởi",
	"Book {{index}} of": "Tập {{index}} của",
	"Part of": "Thuộc",
	Finished: "Đã đọc",
	Read: "Đọc",
	Download: "Tải xuống",
	Less: "Thu gọn",
	More: "Xem thêm",
	Files: "Tệp",
	Details: "Chi tiết",
	Added: "Đã thêm",
	Language: "Ngôn ngữ",
	"Open on {{name}}": "Mở trên {{name}}",
	"Copy {{name}}": "Sao chép {{name}}",

	// Book actions and files
	"No files": "Không có tệp",
	"Mark as unread": "Đánh dấu chưa đọc",
	"Mark as Finished": "Đánh dấu đã đọc",
	"Download {{format}}": "Tải xuống {{format}}",
	"Open {{format}}": "Mở {{format}}",

	// Metadata search
	"Find book details": "Tìm thông tin sách",
	"Search by title, author, or ISBN…": "Tìm theo tựa đề, tác giả hoặc ISBN…",
	"No matches found. Try a different title, or search by ISBN.":
		"Không tìm thấy kết quả. Thử tựa đề khác hoặc tìm theo ISBN.",
	"Search your enabled sources by title, author, or ISBN.":
		"Tìm trong các nguồn đã bật theo tựa đề, tác giả hoặc ISBN.",
	"Matches ISBN": "Khớp ISBN",
	"also on {{names}}": "cũng có trên {{names}}",
	"Still checking {{names}}…": "Đang kiểm tra {{names}}…",
	Stop: "Dừng",

	// Rich text toolbar
	Bold: "In đậm",
	Italic: "In nghiêng",
	Underline: "Gạch chân",
	"Bullet list": "Danh sách dấu đầu dòng",
	"Numbered list": "Danh sách đánh số",
	"Text formatting": "Định dạng văn bản",

	// Cover pickers
	"{{title}}, book {{position}} of {{total}}":
		"{{title}}, sách {{position}} trên {{total}}",
	"Show {{title}}": "Xem {{title}}",
} satisfies Record<string, string>;
