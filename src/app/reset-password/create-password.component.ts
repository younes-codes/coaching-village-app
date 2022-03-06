import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpServices} from "../services/http.services";
import {UserServices} from "../services/user.services";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  user: User;
  users: User[] = [];
  userId: string;
  firstname = '';
  email: string;
  isPwdHidden = false;
  isLoading = true;
  @ViewChild('password') password: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirm: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpServices,
  ) {
  }

  ngOnInit(): void {
    this.fetchUser();
    this.userId = this.route.snapshot.params.userId;
    if (!this.userId) {
      return;
    }
  }

  private fetchUser(): void {
    this.httpService.fetchUsers()
      .subscribe((users) => {
        this.users = users[0];
        this.user = this.users.find(u => u._id === this.userId)!;
        this.email = this.user ? this.user.email : '';
        // this.userService.userId$.next(this.user._id);
        this.isLoading = false;
      })
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.httpService
      .updatePassword(email, password)
      .subscribe(_ => {
        return this.router.navigate(['/accueil']);
      });
  }

  changeVisibilityPassword = ($event: Event): void => {
    this.isPwdHidden = !this.isPwdHidden;
    this.password.nativeElement.type = this.isPwdHidden ? '' : 'password';
    this.passwordConfirm.nativeElement.type = this.isPwdHidden ? '' : 'password';
  }
}

