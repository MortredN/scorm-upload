# SCORM Vinschool (scorm-upload)

This is a LTI developed using Angular and Express.js for teachers to upload and embed SCORM courses into [Infrastructure Canvas](https://canvas.instructure.com).

## Server development

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

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. `server.js` will handle the endpoints and serve files from `dist`.

## Instruction

### Upload SCORM courses

Navigate to `Upload SCORM` tab, select a uniquely-generated SCORM course (often in a `.zip` format) and upload it. If the root folder in the zip files already has the same name with an existed folder in `/uploads`, there will be an alert indicating if the user wants to overwrite the existed one with the new one.

### Embed SCORM courses

Navigate to `SCORM List` tab, select a SCORM course using the `Embed` button. Canvas will automatically insert the course's URL and title into the Canvas's `External Tool` tab.
