import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialsModule } from '../../core/materials.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  subscription: Subscription = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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
    const subscribe = this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/main']);
      })

    this.subscription.add(subscribe);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
