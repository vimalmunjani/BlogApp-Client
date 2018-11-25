import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private isLoggedIn = false;
  private authStatus$: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.authStatus$ = this.auth.getAuthState().subscribe((loginStatus) => {
        this.isLoggedIn = loginStatus;
    });

  }

  ngOnDestroy(): void {
    this.authStatus$.unsubscribe();
  }

  onLogOut() {
    this.auth.logOut();
  }

}
