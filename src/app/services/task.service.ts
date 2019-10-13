import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  endpoint = environment.endpoint

  constructor(private http: HttpClient) {
    console.log('Task Service Initialized...')
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(this.endpoint + '/tasks')
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(this.endpoint + '/tasks/' + id)
  }

  addTask(newTask): Observable<any> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<any>(
      this.endpoint + '/tasks',
      newTask,
      { headers: headers }
    )
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(this.endpoint + '/tasks/' + id)
  }

  updateTask(task): Observable<any> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.put<any>(
      this.endpoint + '/tasks/' + task._id,
      task,
      { headers: headers }
    )
  }
}
