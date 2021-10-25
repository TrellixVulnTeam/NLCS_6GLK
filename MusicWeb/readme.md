# HƯỚNG DẪN SỬ DỤNG WEB NGHE NHẠC TRỰC TUYẾN

>Hãy đảm bảo rằng bạn đã cài đặt **[NodeJS](https://nodejs.org/en/download)** và **[MongoDB compass](https://www.mongodb.com/try/download)**

## Sau khi giải nén ta được hai thư mục chứa source code và database như sau:

- MusicWeb

- DatabaseNL (Chua cac collection cua database)

## Cài đặt dependencies cho server

> Xóa thư mục node_modules sau đó thực hiện lệnh bên dưới để cài đặt dependencies cho server

```
npm install
```

## Cài đặt dependencies cho client
### Vào thư mục myapp bằng lệnh
``` 
cd myapp
```
> Xóa thư mục node_modules trong thư mục myapp sau đó thực hiện lệnh bên dưới để cài đặt dependencies cho client

```
npm install
```

## Cài đặt Database

### [Cách tạo database](https://www.mongodb.com/basics/create-database)

> Tạo database với tên là "music_app_dev" và collection: users, playlists, songs

### [Cách import collection](https://docs.mongodb.com/compass/current/import-export)

> Import các collection trong thư mục "DatabaseNL" vào các collection tương ứng users, playlists, songs

## Run server

```
npm start
```

## Run client

```
cd myapp
```

```
npm start
```

## BACKEND API

### Backend api Chạy ở PORT 8080

| route      | method       | Mô tả |
| ----------- | -----------  | ----------- |
| /api/playlist/      |  GET            | Trả về all playlist trong database      |
| /api/playlist/  | POST         | Tạo playlist mới        |
| /api/playlist/:id  | GET        | Trả về một playlist với id tương ứng        |
| /api/playlist/:id  | PUT       | Cập nhật playlist voi id tương ứng        |
| /api/song/  | GET        | Trả về all song trong database       |
| /api/song/  | POST       | Tạo song mới        |
| /api/song/:id  | GET       | Trả về một song với id tương ứng         |
| /api/song/:id  | PUT       | Cập nhật song Với id tương ứng         |
| /api/song/:id  | DELETE         | Xóa song Với id tương ứng         |
| /api/report/  | GET       | Trả về all report trong database       |
| /api/report/  | POST      | Tạo report mới       |
| /api/report/:id  | GET         | Trả về một report với id tương ứng         |
| /api/report/:id  | PUT        | Cập nhật report với id tương ứng     |
| /api/report/:id  | DELETE         | Xóa report với id tương ứng         |
| /api/login/ | POST        | Đăng nhập vào hệ thống (create token)        |
| /api/register/ | POST         | Tạo user mới      |
| /api/user/:id | PUT     | Cập nhật thông tin của user với id tương ứng       |
| /api/user/:id | DELETE         | Xóa user với id tương ứng  |
| /api/user/ | GET         | Trả về all user |
| /api/user/ | POST        | Tạo user mới|

## FRONTEND

### Front end app chạy ở PORT 3000

| route      | Mô tả |
| ----------- | ----------- |
| /  | Trang chủ|
| /login | Trang login      |
| /register/ | Trang dăng ký    |
| /playlist | Trang playlist      |
| /playlist/detail/:id | Trang detail playlist với id tương ứng   |
| /song | Trang song     |
| /song/detail/:id | Trang detail song với id tương ứng      |

### Các sự kiện với bàn phím
| key      | Mô tả |
| ----------- | ----------- |
| Space | play và pause song  |
| Pause | pause song |
| Play | play song  |
| Prev | Chuyển song phía trước trong playlist|
| Next | Chuyển song tiếp theo trong playlist|

### Lỗi phát sinh:
#### Error: Cannot find module './tenanh'. Lỗi này phát sinh trong quá trình load ảnh chưa hoàn thành nhưng trình duyệt đã yêu cầu render ra.
> Cách khắc phục: refresh lại trang
#### E11000 duplicate key error index in mongodb mongoose. 
> Cách khắc phục: drop index name của collection playlists
#### Lỗi khi update ảnh của bài hát nhưng thay vì update ta chọn close thì ảnh mới vẫn được tải lên server.     
#### Lỗi trong quá trình phát nhạc (Khi hàm pause được gọi sau hàm play) (Chi tiết) https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#developer-switches
#### Hiệu ứng cd xoay tròn khi ấn play (Thỉnh thoảng xảy ra lỗi mặc dù ấn pause mà nó vẫn xoay)

### Một số update (Khác so với ảnh chụp trong quyển báo cáo):
#### Chỉnh fontsize, màu chữ, thêm box-shadow cho item card
#### Hiệu ứng active khi chọn bài hát

### Các trang web, video, code đã tham khảo để xây dựng app:

#### Xây dựng musicplayer https://www.youtube.com/watch?v=vAecGPWxzFE&t=5875s
#### Code mẫu musicplayer https://codepen.io/ng-ngc-sn-the-bashful/pen/rNWWLWN
#### Build mern stack app (App mạng xã hội (quản lý bài viết)) https://www.youtube.com/watch?v=8XKOpwLMOgA&list=PLtn74taaT412Wx3EfUvruLMuTGaqMZYiS 
#### Build mern stack app (Ecommerce) https://www.youtube.com/watch?v=uXl77UFkrkQ&t=11779s
#### MERN stack CRUD App https://bezkoder.com/react-node-express-mongodb-mern-stack/
#### Xây dựng server https://www.youtube.com/watch?v=z2f7RHgvddc&list=PL_-VfJajZj0VatBpaXkEHK_UPHL7dW6I3
#### Quan hệ many to many trong mongoose https://bezkoder.com/mongodb-many-to-many-mongoose/
#### React crud api example https://bezkoder.com/react-crud-web-api/