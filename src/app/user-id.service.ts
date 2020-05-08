import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {

  constructor() { }

  // Passing user ID between components
  private userIdSource = new BehaviorSubject<string>("");
  userIdObs = this.userIdSource.asObservable();
  passUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  // Passing auto-insert LTI URL
  private extUrlSource = new BehaviorSubject<string>("");
  extUrlObs = this.extUrlSource.asObservable();
  passExtUrl(extUrl: string) {
    this.extUrlSource.next(extUrl);
  }

  // Passing SCORM URL
  private scormURLSource = new BehaviorSubject<string>("");
  scormURLObs = this.scormURLSource.asObservable();
  passScormUrl(scormURL: string) {
    this.scormURLSource.next(scormURL);
  }
  
}
