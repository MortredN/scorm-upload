import { Component, OnInit } from '@angular/core';
import { ClientAuthService } from '../client-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean

  constructor(private clientAuthService: ClientAuthService, private router: Router) { }

  ngOnInit(): void {
    this.clientAuthService.checkAuth()
    this.clientAuthService.getLoggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn
      if(loggedIn) {
        this.router.navigateByUrl('/');
      }
    })
  }

  signInWithGoogle(): void {
    this.clientAuthService.signInWithGoogle()
  }

}
