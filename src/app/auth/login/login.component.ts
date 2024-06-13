import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialsModule } from '../../core/materials.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailRegex = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
  errorMessage = '';
  subscription: Subscription = new Subscription()

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      "password": ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
