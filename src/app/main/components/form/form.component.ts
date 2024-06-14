import { Component, OnDestroy} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../../../core/materials.module';
import { UserModel } from '../../models/user.model';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  todoForm!: FormGroup;
  errorMessage = ''
  todoChanged: UserModel[] = []
  editMode = false;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private errorHandle: ErrorHandlingService) { }

  ngOnInit() {
    const subscribe = this.todoService.todoChanged.subscribe((data: UserModel[]) => {
      this.todoChanged = data
      this.editMode = true
      this.initForm()
    }, (err: Error) => this.errorHandle.handleError(err))
    this.subscription.add(subscribe);
    this.initForm()
  }

  onSubmit() {
    if (this.todoForm.invalid) return;

    const todoData = this.todoForm.value;

    if (this.editMode) {
      const subscribe = this.todoService.editTodo(this.todoChanged[0].id, todoData).subscribe(() => this.initForm())
      this.subscription.add(subscribe)
    } else {
      const subscribe = this.todoService.createTodo(todoData).subscribe(() => this.initForm())
      this.subscription.add(subscribe)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private initForm() {
    const userData = JSON.parse(localStorage.getItem('user')!);
    let title = '';
    let completed = false;
    let user: number | undefined = userData.user_id;

    if (this.editMode) {
      title = this.todoChanged[0].title;
      completed = this.todoChanged[0].completed;
    }

    this.todoForm = this.formBuilder.group({
      title: [title, Validators.required],
      user: [user, Validators.required],
      completed: [completed],
    });
  }
}
