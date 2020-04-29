import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  checkAuth() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

  getLoggedIn() {
    return of(this.loggedIn)
  }

  getUser() {
    return this.user
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigateByUrl('/')
    });
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/login')
    });
  }
}
