import { Component, OnInit } from '@angular/core';
import { ClientAuthService } from '../client-auth.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean
  user: SocialUser;

  constructor(private clientAuthService: ClientAuthService, private router: Router) { }

  ngOnInit(): void {
    this.clientAuthService.checkAuth()
    this.clientAuthService.getLoggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn
      if(!loggedIn) {
        this.router.navigateByUrl('/login');
      }
      else {
        this.user = this.clientAuthService.getUser()
      }
    })
  }

  signOut() {
    this.clientAuthService.signOut()
  }

}
