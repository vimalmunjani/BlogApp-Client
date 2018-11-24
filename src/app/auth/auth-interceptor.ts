import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token = this.auth.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `${this.auth.getToken()}`
      }
    });

    return next.handle(request);
  }
}





























// import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     constructor(private authService: AuthService) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler>): Observable<HttpEvent<any>> {

//         console.log('interceptor called');
//         const authToken = this.authService.getToken();

//         console.log(`reading token from service - ${authToken}`);

//         const authRequest = req.clone({
//            headers: req.headers.set('Authorization', authToken)
//         });

//         console.log('req', authRequest);


//         return next.handle(authRequest);
//     }
// }
