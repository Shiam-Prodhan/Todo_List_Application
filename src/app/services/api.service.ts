import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postTask(data: any) {
    return this.http.post<any>('http://localhost:3000/taskList/', data);
  }
  getTask() {
    return this.http.get<any>('http://localhost:3000/taskList/');
  }
  putTask(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/taskList/' + id, data);
  }
  deleteTask(id: number) {
    return this.http.delete<any>('http://localhost:3000/taskList/' + id);
  }

  getTask2() {
    return this.http.get<any>('http://localhost:3000/taskList2/');
  }
  postTask2(data: any) {
    return this.http.put<any>('http://localhost:3000/taskList2/', data);
  }
}
