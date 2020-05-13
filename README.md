(Vietnamese here. English down below)

# SCORM Vinschool (scorm-upload)

LTI sử dụng trên nền [Infrastructure Canvas](https://canvas.instructure.com), được phát triển bởi Angular và Express.js. Mục đích của LTI nhằm để giáo viên tải và dán các bài giảng dưới dạng SCORM lên hệ thống [LMS của Vinschool](https://lms.vinschool.edu.vn/).

## Đưa LTI vào sử dụng

### Đổi URL trên các files
Đổi toàn bộ `localhost:3000` sang URL server của bạn:

#### server.js
```javascript
server.post('/run', (req, res) => {
  res.redirect(`http://localhost:3000/list?user_id=${req.body.user_id}&ext_url=${req.body.launch_presentation_return_url}`);
});
```
thành
```javascript
  res.redirect(`{{URL server của bạn}}/list?user_id=${req.body.user_id}&ext_url=${req.body.launch_presentation_return_url}`);
```


#### src/app/list/list.component.ts
```typescript
embedScorm(repoName, repoUrlName, userId): void {
  const passedUrl = `http://localhost:3000/play-scorm/${userId}/${repoUrlName}/${repoName}`;
  window.location.href = `${this.extUrl}?return_type=lti_launch_url&url=${encodeURIComponent(passedUrl)}&title=${repoName}`;
}
```
thành
```typescript
  const passedUrl = `{{URL server của bạn}}/play-scorm/${userId}/${repoUrlName}/${repoName}`;
```


#### src/app/list/list.service.ts
```typescript
getScorms(userId): Observable<Scorm[]> {
  return this.http.get<Scorm[]>(`http://localhost:3000/scorms/${userId}`);
}
```
thành
```typescript
  return this.http.get<Scorm[]>(`{{URL server của bạn}}/scorms/${userId}`);
```


#### src/app/upload/upload.service.ts
```typescript
public checkDuplicateObs(userId, repoUrlName) {
  let checkUrl = `http://localhost:3000/scorm/${userId}/${repoUrlName}`
  return this.http.get<Scorm[]>(checkUrl);
}
```
thành
```typescript
  let checkUrl = `{{URL server của bạn}}/scorm/${userId}/${repoUrlName}`
```

và

```typescript
public upload(data) {
  let uploadURL = `http://localhost:3000/scorm`;
```
thành
```typescript
  let uploadURL = `{{URL server của bạn}}/scorm`;
```

### Angular project

Chạy `ng build` trên shell console để xây dựng project. Toàn bộ các file được dựng sẽ được chứa tại `dist/`. File `server.js` sẽ tự động chạy các file tại `dist` cho người dùng sử dụng.

## Hướng dẫn sử dụng LTI

### Tải các bài giảng SCORM lên hệ thống

Khi nhấp vào thanh `Tải SCORM lên`, sẽ có nút bấm `Upload` để người dùng có thể tải file SCORM lên (Các file SCORM này phải nằm dưới dạng `.zip`). Nếu folder gốc của file zip trùng tên với một trong những folder tại `uploads\:user_id`, người dùng sẽ được thông báo liệu họ có muốn thay thế folder cũ sang folder mới hay không.

### Dán bài giảng SCORM lên Canvas

Khi nhấp vào thanh `Danh sách SCORM`, chọn một trong các bài giảng SCORM và dán bằng cách nhấp vào nút `Embed`. Canvas sẽ tự động điền URL và tên bài giảng vào thanh `External Tool`.



(English here)

# SCORM Vinschool (scorm-upload)

This is a [Infrastructure Canvas](https://canvas.instructure.com) LTI developed using Angular and Express.js for teachers to upload and embed SCORM courses into [Vinschool LMS](https://lms.vinschool.edu.vn/).

## Server Deployment

### URL Changes
Change all `localhost:3000` into your designated deploying URL:

#### server.js
```javascript
server.post('/run', (req, res) => {
  res.redirect(`http://localhost:3000/list?user_id=${req.body.user_id}&ext_url=${req.body.launch_presentation_return_url}`);
});
```
into
```javascript
  res.redirect(`{{Your designated URL}}/list?user_id=${req.body.user_id}&ext_url=${req.body.launch_presentation_return_url}`);
```


#### src/app/list/list.component.ts
```typescript
embedScorm(repoName, repoUrlName, userId): void {
  const passedUrl = `http://localhost:3000/play-scorm/${userId}/${repoUrlName}/${repoName}`;
  window.location.href = `${this.extUrl}?return_type=lti_launch_url&url=${encodeURIComponent(passedUrl)}&title=${repoName}`;
}
```
into
```typescript
  const passedUrl = `{{Your designated URL}}/play-scorm/${userId}/${repoUrlName}/${repoName}`;
```


#### src/app/list/list.service.ts
```typescript
getScorms(userId): Observable<Scorm[]> {
  return this.http.get<Scorm[]>(`http://localhost:3000/scorms/${userId}`);
}
```
into
```typescript
  return this.http.get<Scorm[]>(`{{Your designated URL}}/scorms/${userId}`);
```


#### src/app/upload/upload.service.ts
```typescript
public checkDuplicateObs(userId, repoUrlName) {
  let checkUrl = `http://localhost:3000/scorm/${userId}/${repoUrlName}`
  return this.http.get<Scorm[]>(checkUrl);
}
```
into
```typescript
  let checkUrl = `{{Your designated URL}}/scorm/${userId}/${repoUrlName}`
```

and

```typescript
public upload(data) {
  let uploadURL = `http://localhost:3000/scorm`;
```
into
```typescript
  let uploadURL = `{{Your designated URL}}/scorm`;
```

### Build Angular project and deploy it with Express

Run `ng build` on shell console to build the project. The build artifacts will be stored in the `dist/` directory. `server.js` will handle the endpoints and serve files from `dist`.

## LTI Usage Instruction

### Upload SCORM courses

Navigate to `Upload SCORM` tab, select a uniquely-generated SCORM course (often in a `.zip` format) and upload it. If the root folder in the zip files already has the same name with an existed folder in `/uploads/:user_id`, there will be an alert indicating if the user wants to overwrite the existed one with the new one.

### Embed SCORM courses in Canvas

Navigate to `SCORM List` tab, select a SCORM course using the `Embed` button. Canvas will automatically insert the course's URL and title into the Canvas's `External Tool` tab.
