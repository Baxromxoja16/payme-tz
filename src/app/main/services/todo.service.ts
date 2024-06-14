import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ListOfUsers, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = '/api/todo'
  token = localStorage.getItem('token');
  todoChanged = new Subject<UserModel[]>();
  listOfUsers: WritableSignal<ListOfUsers> = signal<ListOfUsers>({} as ListOfUsers);

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<ListOfUsers>(this.baseUrl).pipe(
      tap((list) => {
        this.listOfUsers.set(list);
      })
    );
  }

  getDetailTodo(id: string) {
    return this.http.get<UserModel>(this.baseUrl + '/' + id);
  }

  createTodo(data: UserModel) {
    return this.http.post(this.baseUrl, data);
  }

  editTodo(id: string, data: UserModel) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }

  deleteTodo(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}
