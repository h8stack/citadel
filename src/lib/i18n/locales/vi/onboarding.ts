/** First-run onboarding, library setup/recovery, and uploads. */
export const onboarding = {
	// First-run setup card
	"Change…": "Thay đổi…",
	"Found your Calibre library": "Đã tìm thấy thư viện Calibre",
	"Via your Calibre settings.": "Qua cài đặt Calibre.",
	"At Calibre’s default location.": "Tại vị trí mặc định của Calibre.",
	"Opening…": "Đang mở…",
	"Use This Library": "Dùng thư viện này",
	"Choose a Different Folder…": "Chọn thư mục khác…",
	"Start a New Library…": "Tạo thư viện mới…",
	"Open your Calibre library": "Mở thư viện Calibre",
	"Checking folder…": "Đang kiểm tra thư mục…",
	"Checking folder": "Đang kiểm tra thư mục",
	"That folder isn’t a library": "Thư mục đó không phải thư viện",
	"Start a New Library Here": "Tạo thư viện mới tại đây",
	"New library": "Thư viện mới",
	"Citadel creates this folder. Books you import are copied into it.":
		"Citadel sẽ tạo thư mục này. Sách nhập vào sẽ được sao chép vào đó.",
	"Books you import are copied into this folder.":
		"Sách nhập vào sẽ được sao chép vào thư mục này.",
	"Create Library": "Tạo thư viện",
	"Open It Instead": "Mở thư viện này",
	"This folder is synced": "Thư mục này được đồng bộ",
	"{{provider}} syncs this folder, and a sync while the library is open can conflict with its database.":
		"{{provider}} đang đồng bộ thư mục này; việc đồng bộ trong lúc thư viện đang mở có thể xung đột với cơ sở dữ liệu của thư viện.",
	"A cloud service": "Dịch vụ đám mây",
	"Opening your library": "Đang mở thư viện",
	"Opening library": "Đang mở thư viện",
	"Loading metadata": "Đang tải siêu dữ liệu",
	"Preparing covers": "Đang chuẩn bị bìa",
	"Your library isn’t reachable": "Không thể truy cập thư viện",
	"Citadel couldn’t open the library at this path. If it lives on an external drive or a network share, reconnect it, then retry.":
		"Citadel không thể mở thư viện tại đường dẫn này. Nếu thư viện nằm trên ổ đĩa ngoài hoặc thư mục chia sẻ qua mạng, hãy kết nối lại rồi thử lại.",
	"Still not reachable.": "Vẫn không thể truy cập.",
	"Open a Different Library…": "Mở thư viện khác…",
	"Set up your library": "Thiết lập thư viện",
	"Your library is ready": "Thư viện đã sẵn sàng",
	"Your library is ready.": "Thư viện đã sẵn sàng.",
	// Shared chooser and reveal
	"Citadel keeps your books in a Calibre‑compatible library.":
		"Citadel lưu sách trong thư viện tương thích Calibre.",
	"Open your existing library folder.": "Mở thư mục thư viện hiện có.",
	"Create an empty library at ~/Citadel.": "Tạo thư viện trống tại ~/Citadel.",
	"Or another folder": "Hoặc thư mục khác",
	"I have a Calibre library": "Đã có thư viện Calibre",
	"Start a new library": "Tạo thư viện mới",
	"Show Books": "Xem sách",
	"Library opened. {{summary}}.": "Đã mở thư viện. {{summary}}.",
	"{{books}} book": "{{books}} cuốn sách",
	"{{books}} books": "{{books}} cuốn sách",
	"by {{authors}} author": "của {{authors}} tác giả",
	"by {{authors}} authors": "của {{authors}} tác giả",
	// Library picker
	"Couldn't add that folder": "Không thể thêm thư mục đó",
	"Switch library": "Chuyển thư viện",
	"Library: {{name}}": "Thư viện: {{name}}",
	// Browser library gate
	"Citadel isn’t set up yet": "Citadel chưa được thiết lập",
	"This server has no library yet. Ask the administrator to choose one.":
		"Máy chủ này chưa có thư viện. Hãy đề nghị quản trị viên chọn một thư viện.",
	"Your library isn’t available": "Thư viện hiện không khả dụng",
	"The server can’t reach its library right now. The administrator can see why and bring it back.":
		"Máy chủ hiện không thể truy cập thư viện của mình. Quản trị viên có thể xem nguyên nhân và khôi phục.",
	"No library to show": "Không có thư viện để hiển thị",
	"{{username}} doesn’t have access to this server’s library yet. Ask the person who runs Citadel to grant it.":
		"{{username}} chưa có quyền truy cập thư viện của máy chủ này. Hãy đề nghị người quản lý Citadel cấp quyền.",
	"Couldn’t reach Citadel": "Không thể kết nối Citadel",
	"Citadel isn’t set up for this address":
		"Citadel chưa được thiết lập cho địa chỉ này",
	"Try again": "Thử lại",
	"Check again": "Kiểm tra lại",
	"Sign out": "Đăng xuất",
	"Couldn’t open your library": "Không thể mở thư viện",
	"The Citadel server could not be reached.":
		"Không thể kết nối máy chủ Citadel.",
	// Web setup: public URLs
	"Public URL": "URL công khai",
	"Citadel only accepts traffic at these URLs: you can add more to your configuration.":
		"Citadel chỉ nhận lưu lượng tại các URL này; có thể thêm URL khác trong phần cấu hình.",
	"Optional: to have Citadel accept traffic only at this URL and localhost, add it to":
		"Tùy chọn: để Citadel chỉ nhận lưu lượng tại URL này và localhost, hãy thêm nó vào",
	"(or": "(hoặc",
	"in the config file) and restart Citadel.":
		"trong tệp cấu hình) rồi khởi động lại Citadel.",
	"URL others will use": "URL người khác sẽ dùng",
	"Current URL": "URL hiện tại",
	"Copy URL": "Sao chép URL",
	"Citadel still has no public URLs. Restart it after setting CITADEL_PUBLIC_URLS, then continue.":
		"Citadel vẫn chưa có URL công khai. Hãy khởi động lại sau khi đặt CITADEL_PUBLIC_URLS rồi tiếp tục.",
	Skip: "Bỏ qua",
	// Web setup: server folders and library
	"Checking the server": "Đang kiểm tra máy chủ",
	"One moment…": "Vui lòng chờ…",
	"Couldn’t reach the server": "Không thể kết nối máy chủ",
	"Folders on the server": "Thư mục trên máy chủ",
	"Up one folder": "Lên thư mục cha",
	"Listing…": "Đang liệt kê…",
	library: "thư viện",
	"This folder has no folders inside it.": "Thư mục này không có thư mục con.",
	"Choose This Folder": "Chọn thư mục này",
	"Use an existing library": "Dùng thư viện hiện có",
	"Choose an empty folder on the server for it.":
		"Chọn một thư mục trống trên máy chủ cho thư viện này.",
	"Choose the server folder that holds metadata.db.":
		"Chọn thư mục trên máy chủ chứa metadata.db.",
	"Folder on the server": "Thư mục trên máy chủ",
	"Browse…": "Duyệt…",
	", in an older Calibre format": ", ở định dạng Calibre cũ hơn",
	"Citadel creates this folder. Books you add are copied into it.":
		"Citadel sẽ tạo thư mục này. Sách thêm vào sẽ được sao chép vào đó.",
	"Books you add are copied into this folder.":
		"Sách thêm vào sẽ được sao chép vào thư mục này.",
	"Use It Instead": "Dùng thư viện này",
	"read-only": "chỉ đọc",
	"Start a new library in {{path}}": "Tạo thư viện mới trong {{path}}",
	"This folder is empty.": "Thư mục này trống.",
	"Name your library": "Đặt tên thư viện",
	"Open this library": "Mở thư viện này",
	"Readers you add see this name. You can change it later.":
		"Người đọc được thêm sẽ thấy tên này. Có thể đổi lại sau.",
	"Open Library": "Mở thư viện",
	"{{name}} isn’t reachable": "Không thể truy cập {{name}}",
	"The server couldn’t open the library at this path.":
		"Máy chủ không thể mở thư viện tại đường dẫn này.",
	"If it lives on a drive or share that isn’t mounted, reconnect it, then retry.":
		"Nếu thư viện nằm trên ổ đĩa hoặc thư mục chia sẻ chưa được gắn kết, hãy kết nối lại rồi thử lại.",
	"It Moved — Choose the New Location…":
		"Thư viện đã chuyển — chọn vị trí mới…",
	"Found in the folders mounted for libraries:":
		"Tìm thấy trong các thư mục được gắn kết cho thư viện:",
	"Your books live in a Calibre‑compatible library.":
		"Sách được lưu trong thư viện tương thích Calibre.",
	"Use a Calibre library already on the server.":
		"Dùng thư viện Calibre đã có trên máy chủ.",
	"Make an empty library on the server.": "Tạo thư viện trống trên máy chủ.",
	// Database recovery
	"Update Citadel": "Cập nhật Citadel",
	"Restore from {{date}}": "Khôi phục từ {{date}}",
	"Restore a previous version": "Khôi phục phiên bản trước",
	"Reading apps will need a new sharing password.":
		"Ứng dụng đọc sách sẽ cần mật khẩu chia sẻ mới.",
	"Quit Citadel": "Thoát Citadel",
	"Working…": "Đang xử lý…",
	"That didn’t work:": "Không thành công:",
	// Library switch curtain
	"Opening ‘{{name}}’": "Đang mở ‘{{name}}’",
	"Opening {{name}}": "Đang mở {{name}}",
	// Upload sheet
	"Hold to stop adding these books": "Giữ để dừng thêm sách",
	"Hold to cancel all uploads": "Giữ để hủy tất cả tải lên",
	"Review Book": "Xem xét sách",
	"Add Books": "Thêm sách",
	"{{ready}} of {{total}} ready": "{{ready}}/{{total}} sẵn sàng",
	"Choose more books": "Chọn thêm sách",
	"Books to add": "Sách cần thêm",
	Uploads: "Mục tải lên",
	"Drop more books here or": "Kéo thả thêm sách vào đây hoặc",
	"choose files": "chọn tệp",
	"Cancel Adding Books": "Hủy thêm sách",
	"Cancel All Uploads": "Hủy tất cả tải lên",
	"Add books to your library": "Thêm sách vào thư viện",
	"Drop books anywhere on the window, or choose them from your files.":
		"Kéo thả sách vào bất kỳ đâu trên cửa sổ, hoặc chọn từ tệp.",
	"Choose books from your files to add them.": "Chọn sách từ tệp để thêm vào.",
	"Choose books from your files to upload them.":
		"Chọn sách từ tệp để tải lên.",
	"Choose Books": "Chọn sách",
	"Cancel All": "Hủy tất cả",
	"Add All": "Thêm tất cả",
	"Review Books": "Xem xét sách",
	"Review 1 Book": "Xem xét 1 cuốn sách",
	"Review {{count}} Books": "Xem xét {{count}} cuốn sách",
	"{{count}} ready to review": "{{count}} cuốn sách sẵn sàng xem xét",
	// Upload review
	"Adding…": "Đang thêm…",
	"Review book": "Xem xét sách",
	"All books": "Tất cả sách",
	"All uploads": "Tất cả mục tải lên",
	"Ready books": "Sách sẵn sàng",
	"Previous book": "Sách trước",
	"Next book": "Sách tiếp theo",
	"None left": "Đã hết",
	"{{position}} of {{total}}": "{{position}} / {{total}}",
	// Upload review card
	"Add author": "Thêm tác giả",
	"More details": "Chi tiết khác",
	"Add more details": "Thêm chi tiết",
	"Publisher, language, tags, ISBN": "Nhà xuất bản, ngôn ngữ, thẻ, ISBN",
	"Search languages": "Tìm ngôn ngữ",
	Published: "Ngày xuất bản",
	"Search or add tags": "Tìm hoặc thêm thẻ",
	ISBN: "ISBN",
	"ISBN-10 or ISBN-13": "ISBN-10 hoặc ISBN-13",
	"A book needs a title": "Sách cần có tựa đề",
	"Use a full date": "Nhập ngày đầy đủ",
	"This ISBN's check digit doesn't match": "Số kiểm tra của ISBN không khớp",
	"An ISBN has 10 or 13 digits": "ISBN có 10 hoặc 13 chữ số",
	// Upload queue row
	Waiting: "Đang chờ",
	"Uploading…": "Đang tải lên…",
	"Reading book…": "Đang đọc sách…",
	"Ready to add": "Sẵn sàng thêm",
	"Couldn't add this file": "Không thể thêm tệp này",
	"Stop uploading {{name}}": "Dừng tải lên {{name}}",
	"Stop reading {{name}}": "Dừng đọc {{name}}",
	"Review {{name}}": "Xem xét {{name}}",
	Review: "Xem xét",
	"Remove {{name}}": "Gỡ {{name}}",
	// Errors and prompts from flow machines
	"Enter a folder on the server, such as /srv/books.":
		"Nhập một thư mục trên máy chủ, ví dụ /srv/books.",
	"This library can't be opened.": "Không thể mở thư viện này.",
	"This folder can't be used.": "Không thể dùng thư mục này.",
	"Read-only": "Chỉ đọc",
	"Upgrade this library to Calibre's current format? A backup is kept.":
		"Nâng cấp thư viện này lên định dạng hiện tại của Calibre? Bản sao lưu sẽ được giữ lại.",
	"For a library you keep managing in Calibre on another computer. Citadel won't change it, so adding and editing books is off.":
		"Dành cho thư viện vẫn được quản lý bằng Calibre trên máy khác. Citadel sẽ không thay đổi thư viện này, nên không thể thêm hay chỉnh sửa sách.",
} satisfies Record<string, string>;
