import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateAccountService} from "../create-account.service";
import {AuthServices} from "../../../services/auth.services";
import {UserServices} from "../../../services/user.services";
import {User} from "../../../models/user.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-height-weight',
    templateUrl: './height-weight.component.html',
    styleUrls: ['./height-weight.component.scss'],
    host: {
        'class': 'child-component'
    }
})
export class HeightWeightComponent implements OnInit {
    userDetails: User;
    logSub: Subscription;
    isLoading = false;
    @ViewChild('height') height: ElementRef;
    @ViewChild('weight') weight: ElementRef;


    constructor(private router: Router,
                private authServices: AuthServices,
                private userService: UserServices,
                private creationAccountService: CreateAccountService) {
    }

    ngOnInit(): void {
        this.userDetails = this.creationAccountService.userDetails.value;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        const height = +this.height.nativeElement.value;
        const weight = +this.weight.nativeElement.value;
        const _id = this.userService.userId$.value;
        const newUser = {...this.userDetails, height, weight};
        const email = newUser.email;
        const password = newUser.password;
        this.creationAccountService.userDetails.next(newUser);
        this.authServices.createUser({...newUser, _id}).subscribe(res => {
                this.userService.isAuth$.next(true);
                if (!email || !password) return;
                this.authServices.login(email, password).subscribe(res => {
                        this.userService.user$.next(res.user);
                        this.router.navigate(['/mon-profil']);
                    },
                    error => {
                        this.isLoading = false;
                    });
            },
            error => {
                this.isLoading = false;
            })
    }

    goBack() {
        this.router.navigate(['creer-un-compte/sexe']);
    }
}
