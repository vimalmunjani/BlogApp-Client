import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;
  constructor(private snackBar: MatSnackBar) { }

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

    console.log('form', form.value);
  }

}
