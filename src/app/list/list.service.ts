import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scorm } from './scorm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getScorms(userId): Observable<Scorm[]> {
    return this.http.get<Scorm[]>(`http://localhost:3000/scorms/${userId}`);
  }
}
