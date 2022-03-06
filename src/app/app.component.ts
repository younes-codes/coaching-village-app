import {Component, OnInit} from '@angular/core';
import {UserServices} from "./services/user.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth: boolean;

  constructor(private userService: UserServices, private router: Router) {
  }

  ngOnInit() {
    this.userService.autoLogging();
    this.userService.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }


  logout() {
    this.userService.isAuth$.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}

