import { Component, OnDestroy, OnInit, WritableSignal} from '@angular/core';
import { MaterialsModule } from '../../../core/materials.module';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { ListOfUsers, UserModel } from '../../models/user.model';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MaterialsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnDestroy, OnInit {
  listOfUsers: WritableSignal<ListOfUsers> = this.todoService.listOfUsers;
  subscription: Subscription = new Subscription()

  constructor(
    private todoService: TodoService) { }

  ngOnInit(): void {
    const subscribe = this.todoService.getTodos().subscribe();

    this.subscription.add(subscribe);
  }

  editTodo(user: UserModel) {
    this.todoService.todoChanged.next(user);
  }

  deleteTodo(user: UserModel) {
    const subscribe = this.todoService.deleteTodo(user.id).subscribe();
    this.subscription.add(subscribe);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
