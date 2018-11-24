import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean;
  constructor(private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
  }

  onSignup(form: NgForm) {

    if (form.invalid) {
      this.snackBar.open('Enter Required Fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    if (form.value.password !== form.value.cpassword) {
      this.snackBar.open('Passwords dont match', 'OK', {
        duration: 2000,
      });
      return;
    }

    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };

    this.isLoading = true;
    this.authService.createUser(authData).subscribe(data => {

    this.isLoading = false;
      console.log('res data', data);
      if (data.status === 201) {
        this.snackBar.open('Sign Up successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/login']);
        return;
      } else {
        this.snackBar.open('Error Signing Up', 'OK', {
          duration: 2000,
        });
        return;
      }
    });

    console.log('form', form.value);
  }

}
