import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { User } from './../../models/user';
import { RegisterService } from './../../services/auth/register.service';
import { LoginService } from './../../services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService, LoginService]
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router
  ) {
    console.log('register page finished...');
  }

  ngOnInit() {
    this.initUser();
  }

  public initUser() {
    if (this.user === undefined) {
      this.user = new User;
    }

    this.user.username = '';
    this.user.password = '';
  }

  public register(newUser: User) {
    let that: any;
    that = this;

    if (newUser.username !== '' || newUser.password !== '') {
      this.registerService.register(newUser)
        .subscribe(
          // onNext
          function(success) {
            let user: any;

            user = {
              username: that.user.username,
              password: that.user.password,
            }

            that.loginService.login(user)
              .subscribe(
                // onNext
                onNext => {
                  let session: any;

                  session = {
                    username: success.username,
                    token: success.token,
                  }

                  sessionStorage.setItem('currentUser', JSON.stringify(session));
                },
                // onError
                onError => {
                  console.log(onError);
                },
                // onCompleted
                () => {
                  console.log('login complete');
                }
              );
            },
            // onError
            function(failure) {
              console.log(failure);
            },
            // onCompleted
            function() {
              console.log('register complete');
            }
        );
    }
  }
}
