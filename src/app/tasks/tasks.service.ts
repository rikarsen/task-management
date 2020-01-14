import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      'http://www.mocky.io/v2/5def635c2f000004178e09b1'
    );
  }
}
