import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean;
  constructor(private snackBar: MatSnackBar) { }

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

    console.log('form', form.value);
  }

}
