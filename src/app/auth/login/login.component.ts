import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  constructor(private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = false;
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      this.snackBar.open('Enter Required Fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };

    this.isLoading = true;
    this.authService.logIn(authData).subscribe((response) => {

    this.isLoading = false;

      console.log('login response', response);

      if (response.status === 200) {

        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000,
        });
        return;

      } else {

        this.snackBar.open('Error Logging In', 'OK', {
          duration: 2000,
        });
        return;

      }

    });

  }

}
