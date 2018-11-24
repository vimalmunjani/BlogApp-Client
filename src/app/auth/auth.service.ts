import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './models/auth-data.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `http://localhost:3000/api/user/`;
  private token: string;
  private authStateListener = new Subject<boolean>();
  private isLoggedIn = false;

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(authData: AuthData) {

    const signUpURL = `${this.apiURL}signup`;
    return this.http.post<{status, message, data}>(signUpURL, authData);

  }

  logIn(authData: AuthData) {

    console.log('login service ', authData);
    const logInURL = `${this.apiURL}login`;

    this.http.post<{status, message, token}>(logInURL, authData).subscribe(res => {
      if (res.token) {
        this.token = res.token;
        this.isLoggedIn = true;
        this.authStateListener.next(true);
        this.router.navigate(['/']);
      }
    });

    return this.http.post<{status, message, token}>(logInURL, authData);

  }

  getToken() {
    return this.token;
  }

  getAuthState() {
    return this.authStateListener.asObservable();
  }

  getLogInState() {
    return this.isLoggedIn;
  }

  logOut() {
    this.token = null;
    this.isLoggedIn = false;
    this.authStateListener.next(false);
    this.router.navigate(['/']);
  }
}
