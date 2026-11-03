# SEO & Distribution Metadata: IT-001

> **Video ID**: IT-001  
> **Topic**: Middleware vs Guard vs Interceptor trong NestJS  
> **Channel**: [@laptrinhfullstack](https://www.youtube.com/@laptrinhfullstack)  
> **Duration**: 45s (1350 frames @ 30 FPS)  
> **Format**: 9:16 (1080 x 1920)

---

## 1. YouTube Shorts

### Title (< 70 ký tự)
`Middleware vs Guard vs Interceptor trong NestJS khác gì? #shorts`

### Description
Bạn có bao giờ phân vân khi nào nên dùng Middleware, Guard hay Interceptor trong NestJS không? Dùng sai vị trí sẽ khiến code khó maintain, bypass bảo mật và phá vỡ kiến trúc Dependency Injection.

Thứ tự chuẩn của NestJS Request Lifecycle:
1. Middleware: Chạy đầu tiên, xử lý raw request, CORS, cookie, parser.
2. Guard: Quyết định cho request đi tiếp hay chặn lại (`canActivate`), dùng cho JWT Auth & phân quyền Roles.
3. Interceptor (Before): Tiền xử lý RxJS stream trước khi vào Route Handler.
4. Pipe: Validate schema (class-validator) và transform kiểu dữ liệu.
5. Route Handler: Controller thực thi logic nghiệp vụ.
6. Interceptor (After): Hứng response trả về, đo latency logging hoặc wrap định dạng JSON chuẩn.

🚀 Khám phá khóa học "NestJS Thực Chiến: API & Real-time App" của mình tại link trong phần mô tả & bio nhé!
Đăng ký kênh @laptrinhfullstack để nâng trình Backend mỗi ngày!

### Hashtags
`#Shorts #NestJS #Backend #Nodejs #TypeScript #LậpTrình #WebDevelopment #LapTrinhFullstack`

### Video Tags (YouTube Studio Copy-Paste)
`nestjs, middleware nestjs, guard nestjs, interceptor nestjs, request lifecycle nestjs, hoc nestjs, nestjs tieng viet, backend nodejs, typescript backend, laptrinhfullstack, do tan thanh`

---

## 2. TikTok

### Caption (< 150 ký tự)
`Middleware vs Guard vs Interceptor trong NestJS khác gì? Đừng nhầm kẻo vỡ kiến trúc! 🚀 #laptrinh #nestjs #backend #nodejs #coding #developer #learnontiktok #laptrinhfullstack`

---

## 3. Facebook Reels

### Caption
Dùng sai Middleware, Guard hay Interceptor là sai lầm phổ biến nhất của dev khi mới học NestJS! 🤔

Cùng điểm nhanh quy tắc "vàng" của NestJS Request Lifecycle:
🔹 Middleware: Xử lý request sơ bộ (CORS, body parser, raw logging) trước khi chạm tới Route Handler.
🔹 Guard: Chốt chặn bảo mật (`canActivate()`) quyết định request có được phép vào hay không (Authentication & Authorization).
🔹 Interceptor: Vũ khí 2 chiều cực mạnh! Chạy cả TRƯỚC và SAU handler nhờ RxJS, lý tưởng để đo latency logging và transform response payload.

👉 Link khóa học NestJS Thực Chiến đang có ưu đãi tại phần bình luận ghim! Follow kênh @laptrinhfullstack để đón xem thêm nhiều video chất lượng nhé!

#NestJS #Backend #NodeJS #TypeScript #LapTrinhFullstack #LapTrinhVien #WebDev

