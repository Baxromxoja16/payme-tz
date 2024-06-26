import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { MaterialsModule } from '../../../core/materials.module';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { ListOfUsers, UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MaterialsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnDestroy, OnInit {
  listOfUsers: WritableSignal<ListOfUsers> = this.todoService.listOfUsers;
  subscription: Subscription = new Subscription();
  isLoading = false;

  constructor(
    private todoService: TodoService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    const subscribe = this.todoService.getTodos().subscribe(
      () => this.isLoading = false
    );

    this.subscription.add(subscribe);
  }

  editTodo(user: UserModel) {
    this.todoService.todoChanged.next(user);
  }

  deleteTodo(user: UserModel) {
    const subscribe = this.todoService.deleteTodo(user.id).subscribe();
    this.subscription.add(subscribe);
  }

  detailsTodo(user: UserModel) {
    this.router.navigate(['main/detail/' + user.id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
