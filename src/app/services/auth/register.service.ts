import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './../../models/user';

@Injectable()
export class RegisterService {
  endpoint = 'http://localhost:3000';

  constructor(private http: Http) {
    console.log('Register Service Initialized...');
  }

  register(user: User) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.endpoint + '/register',
      JSON.stringify(user),
      {headers: headers}
    ).map(res => res.json());
  }
}
