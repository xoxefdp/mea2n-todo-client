import { Component, OnInit, OnDestroy } from '@angular/core'

import { UsersService } from '@app/services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})

export class LoginComponent implements OnInit, OnDestroy {

  username: string
  password: string

  constructor(private usersService: UsersService) {
    this.resetCredentials()
  }

  ngOnInit() {
    console.log('ngOnInit')
  }

  ngOnDestroy() {
    this.resetCredentials()
    console.log('ngOnDestroy')
  }

  resetCredentials(): void {
    this.username = ''
    this.password = ''
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {
      try {
        this.usersService.login({
          username: this.username,
          password: this.password
        }).subscribe(data => {
          console.log(data)
        })
      } catch (error) {
        console.log(error)
        return error
      }
    } else {
      console.log('Invalid credentials')
    }
  }

}
