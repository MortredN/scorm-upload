import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Scorm } from '../list/scorm';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  constructor(private http: HttpClient) { }

  public checkDuplicateObs(userId, repoName) {
    let checkUrl = `http://localhost:3000/scorm/${userId}/${repoName}`
    return this.http.get<Scorm[]>(checkUrl);
  }

  public upload(data) {
    let uploadURL = `http://localhost:3000/scorm`;

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type)
      {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
          
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
