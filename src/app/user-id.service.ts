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
  
}
