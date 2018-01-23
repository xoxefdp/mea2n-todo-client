import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { User } from './../../models/user';
import { LoginService } from './../../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user: User;
  token: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    console.log('login page finished...');
  }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser') == null) {
      this.initUser();
    } else {
      this.initUser();
      this.getSession();
    }
  }

  public initUser() {
    if (this.user === undefined) {
      this.user = new User;
    }

    this.user.username = '';
    this.user.password = '';
    this.token = '';
  }

  public login(authenticateUser: User) {
    let that: any;
    that = this;

    if (authenticateUser.username !== '' || authenticateUser.password !== '') {
      this.loginService.login(authenticateUser)
        .subscribe(
          // onNext
          function(success) {
            let session: any;

            session = {
              username: that.user.username,
              token: success.token,
            }

            that.token = session.token;
            that.user.password = '';

            that.setSession(session);

            that.router.navigateByUrl('/task');
          },
          // onError
          function(failure) {
            console.log(failure);
            that.router.navigateByUrl('/register');
          },
          // onCompleted
          function() {
            console.log('login complete');
          }
        );
    }
  }

  public logout() {
    this.loginService.logout();
    this.initUser();
  }

  private getSession() {
    this.user.username = JSON.parse(sessionStorage.getItem('currentUser')).username;
    this.token = JSON.parse(sessionStorage.getItem('currentUser')).token;
  }

  private setSession(session) {
    sessionStorage.setItem('currentUser', JSON.stringify(session));
  }
}
