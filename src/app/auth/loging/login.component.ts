import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserServices} from "../../services/user.services";
import {AuthServices} from "../../services/auth.services";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-loging',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    userId: string;
    isAuth: boolean;
    errorMessage: string;

    isLoading = false;
    isPwdHidden = false;

    private loginSub$: Subscription;

    @ViewChild('password') password: ElementRef;

    constructor(private route: ActivatedRoute,
                private userService: UserServices,
                private authServices: AuthServices,
                private router: Router
    ) {
    }


    ngOnInit(): void {
        this.userService.autoLogging();
        this.userService.isAuth$.subscribe(res => {
            this.isAuth = res;
        })
    }

    ngOnDestroy() {
        if (this.loginSub$) {
            this.loginSub$.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        const email = form.value.email.trim();
        const password = form.value.password;
        if (form.valid) {
            this.isLoading = true;
        }
        this.loginSub$ = this.authServices.login(email, password).subscribe(res => {
                this.userService.isAuth$.next(true);
                this.userService.user$.next(res.user)
                this.isAuth = this.userService.isAuth$.value;
                this.router.navigate(['accueil']);
            },
            error => {
                this.isLoading = false;
                console.log(error);
                this.errorMessage = error;
            }
        );
        this.errorMessage = '';
    }

    changeVisibilityPassword = ($event: Event): void => {
        this.isPwdHidden = !this.isPwdHidden;
        this.password.nativeElement.type = this.isPwdHidden ? '' : 'password';
    }

    goBack() {
        this.router.navigate([''])
    }
}
