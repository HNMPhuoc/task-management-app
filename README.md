# Server Backend

Dự án này là một server backend được xây dựng trên nền tảng **Node.js** và **Express.js**, sử dụng **MongoDB** làm cơ sở dữ liệu. Nó được thiết kế để cung cấp các API mạnh mẽ và có khả năng mở rộng cho ứng dụng của bạn.

---

## Các tính năng chính

* **Bảo mật:** Sử dụng **`bcryptjs`** để băm mật khẩu và **`jsonwebtoken`** để xác thực người dùng.
* **Quản lý cơ sở dữ liệu:** Tương tác với MongoDB một cách dễ dàng và hiệu quả bằng **`mongoose`**.
* **Ghi log:** Theo dõi các yêu cầu HTTP và lỗi hệ thống với **`morgan`** và **`winston`**.
* **Cấu hình linh hoạt:** Quản lý các biến môi trường một cách an toàn bằng **`dotenv`**.
* **CORS:** Hỗ trợ CORS (Cross-Origin Resource Sharing) để cho phép các yêu cầu từ nhiều nguồn khác nhau.
* **Kiểm thử:** Có sẵn các công cụ kiểm thử như **`jest`**, **`supertest`**, và **`mongodb-memory-server`** để đảm bảo chất lượng code.

---

## Cài đặt

1.  Clone repository về máy tính của bạn:
    ```bash
    git clone https://github.com/HNMPhuoc/task-management-app.git
    ```

2.  Vào thư mục dự án và cài đặt tất cả các dependencies:
    ```bash
    cd server
    npm install
    ```
    hoặc gõ lệnh này để tự tải thư viện cần
    ```bash
    npm update
    ```

---

## Sử dụng

Bạn có thể chạy dự án bằng các lệnh sau:

* **Chế độ phát triển:** Dùng `nodemon` để tự động khởi động lại server khi có thay đổi.
    ```bash
    npm run dev
    ```

* **Chế độ sản phẩm:** Chạy server một cách ổn định.
    ```bash
    npm start
    ```

---

## Cấu hình môi trường

Tạo một tệp `.env` ở thư mục gốc của dự án để quản lý các biến môi trường. Ví dụ:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/task_app_management
JWT_SECRET=mot_chuoi_bi_mat_manh
JWT_EXPIRES_IN=1h
```
# Server Frontend

Dự án này là một client frontend được xây dựng trên nền tảng **Reactjsx** và **Tailwindcss**. Với kiến trúc hiện đại, ứng dụng được thiết kế để cung cấp một trải nghiệm người dùng nhanh chóng, mượt mà và trực quan.

---

### 🚀 Tính năng nổi bật

* **Thiết kế hiện đại:** Sử dụng **Tailwind CSS** và **Material-UI (MUI)** để xây dựng giao diện đẹp mắt, linh hoạt và đáp ứng trên mọi thiết bị.
* **Quản lý trạng thái:** Sử dụng **Zustand** để quản lý trạng thái ứng dụng một cách đơn giản và hiệu quả.
* **Định tuyến:** Quản lý các route và điều hướng trong ứng dụng bằng **`react-router-dom`**.
* **Thao tác API:** Dễ dàng thực hiện các yêu cầu HTTP với backend bằng **`axios`**.
* **Thông báo người dùng:** Cung cấp các thông báo tương tác và tùy chỉnh với **`react-hot-toast`** và **`react-toastify`**.
* **Xử lý ngày tháng:** Hỗ trợ xử lý ngày tháng nâng cao với **`dayjs`** và các components **MUI Date Pickers**.
* **Trực quan hóa dữ liệu:** Hiển thị biểu đồ và dữ liệu phức tạp với **`recharts`**.

---

### 🛠️ Cài đặt

1.  **Cài đặt dependencies:** Di chuyển vào thư mục dự án và cài đặt tất cả các thư viện cần thiết:
    ```bash
    cd client
    npm install
    ```
    hoặc dùng lệnh này để tải thư viện cần thiết
    ```bash
    npm update
    ```
---

### 💻 Sử dụng

Bạn có thể khởi chạy ứng dụng frontend bằng các lệnh sau:

* **Chế độ phát triển (Development):** Chạy server phát triển với **Vite** để hỗ trợ hot-reloading.
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ chạy trên cổng mặc định là `5173`.

* **Chế độ sản phẩm (Production):** Build ứng dụng để chuẩn bị triển khai.
    ```bash
    npm run build
    ```
    Lệnh này sẽ tạo ra một thư mục `dist` chứa các tệp tĩnh đã tối ưu hóa, sẵn sàng để triển khai.

---

### 🤝 Đóng góp

Bạn có thể đóng góp bằng cách:
* Báo cáo lỗi (issue) nếu bạn tìm thấy bất kỳ lỗi nào.
* Đề xuất các tính năng mới hoặc cải tiến.
* Gửi **Pull Request** với những thay đổi của bạn.

---

### 📝 Tác giả

* **HNMPhuoc** - [GitHub](https://github.com/HNMPhuoc)
