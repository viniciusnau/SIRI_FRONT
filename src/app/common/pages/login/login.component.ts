import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading = false;
  inputType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
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

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  resetPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['esqueci-a-senha/']).then((r) => {});
  }

  login() {
    this.loading = true;
    if (this.formLogin.invalid) {
      this.loading = false;
      return;
    }

    const loginData = this.formLogin.getRawValue();

    this.loginService.login(loginData).subscribe(
      (response) => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.snackBar.open(snackbarConsts.login.error, snackbarConsts.close, {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    );
  }
}
