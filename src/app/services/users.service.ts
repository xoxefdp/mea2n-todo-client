import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endpoint = environment.endpoint

  constructor(private http: HttpClient) {
    console.log('User Service Initialized...')
  }

  getUsers(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.endpoint + '/users')
  }

  getUser(id: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.endpoint + '/users/' + id)
  }

  addUser(newUser): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<HttpResponse<any>>(
      this.endpoint + '/users',
      JSON.stringify(newUser),
      { headers: headers }
    )
  }

  login(user): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<HttpResponse<any>>(
      this.endpoint + '/users/login',
      JSON.stringify(user),
      { headers: headers }
    )
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.endpoint + '/users/' + id)
  }

  updateUser(user): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.put<HttpResponse<any>>(
      this.endpoint + '/users/' + user._id,
      JSON.stringify(user),
      { headers: headers }
    )
  }
}
