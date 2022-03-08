import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateAccountService} from "../create-account.service";
import {HttpServices} from "../../services/http.services";
import {catchError, tap} from "rxjs/operators";
import {UserServices} from "../../services/user.services";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    isPwdHidden: boolean;
    showPasswordError = false;
    errorMessage: string;
    userDetails: any;
    @ViewChild('email') email: NgModel;
    @ViewChild('password') password: ElementRef;
    @ViewChild('passwordConfirm') passwordConfirm: ElementRef;


    constructor(private router: Router,
                private userServices: UserServices,
                private httpService: HttpServices,
                private creationAccountService: CreateAccountService) {
    }

    ngOnInit(): void {
        this.userDetails = this.creationAccountService.userDetails.value;
        this.showPasswordError = false;
    }

    onSubmit(form: NgForm) {
        const email = this.email.value;
        const password = this.password.nativeElement.value;
        const passwordConfirm = this.passwordConfirm.nativeElement.value;
        if (password !== passwordConfirm) {
            this.showPasswordError = true;
            return;
        }
        this.httpService.checkEmail(email).subscribe(res => {
                this.creationAccountService.userDetails.next({email, password})
                this.router.navigate(['creer-un-compte/idendite']);
            },
            error => {
                this.errorMessage = error;
            });
        this.errorMessage = '';
    }

    changeVisibilityPassword = ($event: Event): void => {
        this.isPwdHidden = !this.isPwdHidden;
        this.password.nativeElement.type = this.isPwdHidden ? '' : 'password';
        this.passwordConfirm.nativeElement.type = this.isPwdHidden ? '' : 'password';
    }

    goBack() {
        this.router.navigate(['']);
    }
}
