import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [''],
    });
  }

  resetPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['esqueci-a-senha/']).then(r => {});
  }

  login() {
    this.loading = true;
    if (this.formLogin.invalid) {
      this.loading = false;
      return;
    }

    const loginData = this.formLogin.getRawValue();

    this.loginService.loginUser(loginData).subscribe(
      (response) => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
