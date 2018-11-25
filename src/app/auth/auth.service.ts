import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './models/auth-data.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `http://localhost:3000/api/user/`;
  // private token: string;
  private authStateListener = new Subject<boolean>();
  // private isLoggedIn = false;
  private helper = new JwtHelperService();

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
        this.saveToken(res.token);
        // this.token = res.token;
        // this.isLoggedIn = true;
        this.authStateListener.next(true);
        this.router.navigate(['/']);
      }
    });

    return this.http.post<{status, message, token}>(logInURL, authData);

  }

  getAuthState() {
    return this.authStateListener.asObservable();
  }

  getLogInState() {

    const token = this.getToken();
    console.log('getting token', token);
    // const decodeToken = this.helper.decodeToken(token);

    if (!token) {
      return false;
      this.authStateListener.next(false);
    }

    const isTokenExpired = this.helper.isTokenExpired(token);

    if (isTokenExpired) {
      this.deleteToken();
    }
    this.authStateListener.next(!isTokenExpired);
    return !isTokenExpired;
  }

  logOut() {
    // this.token = null;
    // this.isLoggedIn = false;
    this.deleteToken();
    this.authStateListener.next(false);
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    console.log(`saving token - ${token}`);
    console.log(`decoded token - ${JSON.stringify(this.helper.decodeToken(token))}`);
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
