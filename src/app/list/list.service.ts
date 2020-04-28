import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scorm } from './scorm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getScorms(): Observable<Scorm[]> {
    return this.http.get<Scorm[]>('http://localhost:3000/get/scorms')
  }

  accessScorm(repoName, repoUrlName): void {
    const getURL = `http://localhost:3000/play-scorm/${repoUrlName}/${repoName}`
    this.http.get(getURL)
    window.location.href = getURL
  }
}
