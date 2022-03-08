import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthServices} from "../../services/auth.services";
import {UserServices} from "../../services/user.services";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-reset-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {
    user: User;
    users: User[] = [];
    userId: string;
    firstname = '';
    email: string | undefined;
    isPwdHidden = false;
    isLoading = true;
    @ViewChild('password') password: ElementRef;
    @ViewChild('passwordConfirm') passwordConfirm: ElementRef;
    private updatePassword$: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userServices: UserServices,
        private authServices: AuthServices,
    ) {
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params.userId;
        if (!this.userId) {
            return;
        }
    }

    ngOnDestroy() {
        if (this.updatePassword$) {
            this.updatePassword$.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.updatePassword$ = this.authServices
            .updatePassword(email, password)
            .subscribe(_ => {
                    return this.router.navigate(['/accueil']);
                },
                error => {
                    console.log(error)
                });
    }

    changeVisibilityPassword = ($event: Event): void => {
        this.isPwdHidden = !this.isPwdHidden;
        this.password.nativeElement.type = this.isPwdHidden ? '' : 'password';
        this.passwordConfirm.nativeElement.type = this.isPwdHidden ? '' : 'password';
    }
}

