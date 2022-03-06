import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserServices} from "../services/user.services";

@Component({
  selector: 'app-loging',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId: string;
  isPwdHidden = false;
  isAuth: boolean;
  @ViewChild('password') password: ElementRef;

  constructor(private route: ActivatedRoute,
              private userService: UserServices,
              private router: Router
  ) {
  }

  isLoading = false;

  ngOnInit(): void {
    this.userService.autoLogging();
    this.userService.isAuth$.subscribe(res => {
      this.isAuth = res;
    })
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.userService.login(email, password).subscribe(res => {
      this.isLoading = true;
      this.userService.isAuth$.next(true);
      this.isAuth = this.userService.isAuth$.value;
      this.router.navigate(['accueil']);
    });
  }

  changeVisibilityPassword = ($event: Event): void => {
    this.isPwdHidden = !this.isPwdHidden;
    this.password.nativeElement.type = this.isPwdHidden ? '' : 'password';
  }
}
