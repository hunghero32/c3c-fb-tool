# C3C-FB-TOOL

C3C-FB-TOOL là một tiện ích mở rộng dành cho trình duyệt Chrome, được thiết kế để hỗ trợ nhập và xuất tệp `fbtool.json`. Tệp này thường được sử dụng trong các bot dựa trên **fca-unofficial/facebook-chat-api** hoặc các framework tương tự như **C3C**.

---

## **Tính năng chính**

1. **Xuất tệp `fbtool.json`:** Dễ dàng trích xuất trạng thái đăng nhập Facebook của bạn dưới dạng tệp JSON để sử dụng trong các ứng dụng hoặc bot.
2. **Nhập tệp `fbtool.json`:** Cho phép tải lên tệp JSON để khôi phục hoặc thiết lập lại trạng thái đăng nhập.
3. **Tương thích:** Hỗ trợ các bot như **C3C**, **fca-unofficial**, hoặc các API liên quan khác.

---

## **Hướng dẫn cài đặt**

### **1. Cài đặt từ mã nguồn**

1. Clone repository này:
   ```bash
   git clone https://github.com/hunghero32/c3c-fb-tool.git
   ```
2. Mở trình duyệt Chrome, truy cập:
   ```
   chrome://extensions/
   ```
3. Bật **Developer Mode** (Chế độ nhà phát triển).
4. Nhấp vào nút **Load unpacked** (Tải tiện ích chưa đóng gói).
5. Chọn thư mục chứa mã nguồn vừa tải về.

### **2. Sử dụng tiện ích**

- Sau khi cài đặt, biểu tượng tiện ích sẽ xuất hiện trên thanh công cụ của Chrome.
- Nhấp vào biểu tượng để truy cập các chức năng:
  - **Export fbtool:** Xuất tệp `fbtool.json`.
  - **Import fbtool:** Nhập tệp `fbtool.json`.

---

## **Lưu ý quan trọng về bảo mật**

### **1. CẢNH BÁO VỀ VIỆC SỬ DỤNG PACKAGE MOD KHÔNG RÕ NGUỒN GỐC**

Một số package không chính thống (fork hoặc mod của **fca-unofficial/facebook-chat-api**, **ts-messenger-api**, v.v.) có chứa **mã độc** hoặc vi phạm [npm Open Source Terms](https://docs.npmjs.com/policies/open-source-terms). Những package này thường:

- Chứa mã nguồn đã được mã hóa, khó kiểm tra.
- Có thể thu thập dữ liệu cá nhân hoặc thực hiện hành vi độc hại.

**Khuyến nghị:**

- Chỉ sử dụng các package có nguồn gốc rõ ràng, đáng tin cậy.
- Kiểm tra kỹ lưỡng mã nguồn trước khi cài đặt.

> **GHI CHÚ:** Nếu bạn sử dụng các package không chính thống, bạn tự chịu trách nhiệm về mọi rủi ro (bị hack, lộ thông tin, v.v.).

### **2. Bảo mật thông tin cá nhân**

Tệp `fbtool.json` chứa thông tin xác thực nhạy cảm. Vì vậy:

- Không chia sẻ tệp này với bất kỳ ai.
- Lưu trữ tệp ở nơi an toàn, chỉ sử dụng trên thiết bị đáng tin cậy.

---

## **Hỗ trợ và đóng góp**

### **1. Báo cáo lỗi**
Nếu bạn gặp vấn đề trong quá trình sử dụng, hãy mở một issue tại:
[GitHub Issues](https://github.com/hunghero32/c3c-fb-tool/issues)

### **2. Đóng góp mã nguồn**
- Fork repository.
- Tạo branch mới:
  ```bash
  git checkout -b feature/ten-tinh-nang
  ```
- Commit thay đổi của bạn:
  ```bash
  git commit -m "Thêm tính năng mới"
  ```
- Tạo pull request để được xem xét.

---

## **Liên hệ**

- **Email:** hung87800@gmail.com
- **GitHub:** [https://github.com/hunghero32/c3c-fb-tool](https://github.com/hunghero32/c3c-fb-tool)

---

## **Giấy phép**

Phát hành dưới giấy phép [MIT License](LICENSE). Bạn được phép sử dụng, chỉnh sửa và phân phối mã nguồn này nhưng phải tuân thủ các điều khoản trong giấy phép.

---

**Hãy sử dụng mã nguồn mở có trách nhiệm và an toàn!**