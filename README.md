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
