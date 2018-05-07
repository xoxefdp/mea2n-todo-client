import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  endpoint = environment.endpoint;

  constructor(private http: Http) {
    console.log('Task Service Initialized...');
  }

  getTasks() {
    return this.http.get(
      this.endpoint + '/tasks')
      .pipe(
        map( res => res.json() )
      );
  }

  getTask(id: number) {
    return this.http.get(
      this.endpoint + '/task/' + id)
      .pipe(
        map(res => res.json())
      );
  }

  addTask(newTask) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.endpoint + '/task',
      JSON.stringify(newTask),
      {headers: headers})
      .pipe(
        map(res => res.json())
      );
  }

  deleteTask(id: number) {
    return this.http.delete(
      this.endpoint + '/task/' + id)
      .pipe(
        map( res => res.json() )
      );
  }

  updateTask(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      this.endpoint + '/task/' + task._id,
      JSON.stringify(task),
      {headers: headers})
      .pipe(
        map( res => res.json() )
      );
  }
}
