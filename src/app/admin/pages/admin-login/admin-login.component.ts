import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loading: boolean = false;
  formLogin: FormGroup;

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
    if (this.formLogin.invalid) return;

    const loginData = this.formLogin.getRawValue();

    this.loginService.loginAdmin(loginData).subscribe(
      (response) => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}