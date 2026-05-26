# Cổng thông tin hỗ trợ Người khuyết tật Việt Nam — Hoà Nhập

**Hoà Nhập** là một cổng thông tin toàn diện và thân thiện, được thiết kế đặc biệt nhằm hỗ trợ người khuyết tật (NKT) tại Việt Nam tiếp cận dễ dàng với các quyền lợi pháp lý, trợ cấp xã hội, dịch vụ y tế, cơ hội giáo dục và việc làm. Dự án tuân thủ nghiêm ngặt các tiêu chuẩn tiếp cận nội dung web quốc tế **WCAG 2.2 AAA**, đem lại trải nghiệm số bao trùm và không rào cản.

---

## 🌟 Tính năng Trợ năng Cốt lõi (Accessibility Features)

Để phục vụ đa dạng nhóm người dùng với các dạng khuyết tật khác nhau (thị giác, thính giác, vận động, trí tuệ), Hoà Nhập tích hợp các công nghệ trợ năng vượt trội:

### 1. Thanh công cụ trợ năng toàn cục (Accessibility Sidebar)
Một thanh công cụ cố định trực quan bên lề trái màn hình hỗ trợ cấu hình nhanh giao diện:
*   **Tăng/Giảm cỡ chữ:** Phóng to hoặc thu nhỏ chữ đồng bộ trên toàn trang (biên độ từ 0.8x đến 2.0x) thông qua hệ thống biến tỉ lệ CSS, không làm vỡ bố cục.
*   **Chế độ tương phản cao (High Contrast Mode):** Chuyển đổi toàn bộ giao diện sang tông màu độ tương phản tối đa (nền đen, chữ vàng/trắng) dành riêng cho người có thị lực kém hoặc mù màu.
*   **Giao diện tối (Dark Mode):** Chuyển đổi giao diện nền tối dịu mắt, giảm nhức mỏi mắt khi sử dụng thời gian dài.

### 2. Hệ thống Đọc nội dung tự động (Text-to-Speech)
*   Tích hợp sâu với **Web Speech API** của trình duyệt.
*   Tự động phát hiện và khóa giọng nói tiếng Việt chuẩn (ưu tiên giọng nữ Google hoặc giọng tự nhiên của Microsoft).
*   Khi kích hoạt chế độ "Đọc nội dung", hệ thống sẽ tự động đọc to các thẻ tiêu đề, đoạn văn, và nhãn ARIA mô tả của bất kỳ phần tử nào khi người dùng di chuột qua (hover) hoặc chuyển tiêu điểm bàn phím tới (focus).

### 3. Điều hướng bàn phím nâng cao (Keyboard Navigation)
*   **Focus Ring rõ nét:** Khi duyệt trang bằng phím `Tab`, tiêu điểm hiển thị dưới dạng viền vàng dày 4px đi kèm quầng sáng xung quanh, giúp người dùng không dùng chuột dễ dàng định vị.
*   **Skip Link (Liên kết nhảy nhanh):** Cho phép bỏ qua thanh menu điều hướng đầu trang và chuyển thẳng đến vùng nội dung chính (`#main-content`) chỉ bằng một phím bấm.
*   **Chống bẫy tiêu điểm (Focus Trap):** Các cửa sổ khẩn cấp (SOS Modal) hoặc hộp thoại Chatbot tự động giữ tiêu điểm bàn phím di chuyển vòng khép kín bên trong, đóng nhanh bằng phím `Escape` để đảm bảo an toàn tuyệt đối khi điều hướng.

---

## 🛠️ Công nghệ sử dụng

Trang web sử dụng các công nghệ hiện đại, nhẹ bén và bền vững:
*   **Core:** React.js (phiên bản 19)
*   **Build Tool:** Vite (đảm bảo tốc độ HMR tức thì và hiệu suất bundle tối ưu)
*   **Styling:** Tailwind CSS v3 (tích hợp chặt chẽ hệ thống mã màu và kích cỡ của **Hệ thiết kế Phổ Nghi**)
*   **Router:** React Router DOM (phục vụ điều hướng mượt mà giữa các phân hệ chính)

---

## 💻 Hướng dẫn chạy dự án cục bộ

Để chạy mã nguồn dự án trên máy tính của bạn, hãy thực hiện lần lượt các bước sau:

### 1. Tải các thư viện phụ thuộc
Mở terminal trong thư mục dự án và chạy lệnh sau để tải các package cần thiết:
```bash
npm install
```

### 2. Khởi chạy môi trường Phát triển (Development)
Chạy lệnh khởi động máy chủ cục bộ:
```bash
npm run dev
```
Sau đó, mở trình duyệt và truy cập liên kết: `http://localhost:5173/` để xem ứng dụng chạy thực tế.

### 3. Biên dịch bản Production
Để kiểm tra hoặc đóng gói sản phẩm hoàn thiện cho triển khai:
```bash
npm run build
```
Nội dung tĩnh sau khi đóng gói sẽ được lưu trữ trong thư mục `dist/`.
