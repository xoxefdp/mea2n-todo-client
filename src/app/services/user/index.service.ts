import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  endpoint = 'http://localhost:3000/api';

  constructor(private http: Http) {
    console.log('User Service Initialized...');
  }

  getUsers() {
    return this.http.get(
      this.endpoint + '/users')
    .map(res => res.json());
  }

  getUser(id: number) {
    return this.http.get(
      this.endpoint + '/user/' + id)
    .map(res => res.json());
  }

  addUser(newUser) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.endpoint + '/user',
      JSON.stringify(newUser),
      {headers: headers})
    .map(res => res.json());
  }

  deleteUser(id: number) {
    return this.http.delete(
      this.endpoint + '/user/' + id)
    .map(res => res.json());
  }

  updateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.endpoint + '/user/' + user._id,
      JSON.stringify(user),
      {headers: headers})
    .map(res => res.json());
  }
}
