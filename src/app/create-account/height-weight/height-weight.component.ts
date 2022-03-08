import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateAccountService} from "../create-account.service";
import {HttpServices} from "../../services/http.services";
import {UserServices} from "../../services/user.services";

@Component({
    selector: 'app-height-weight',
    templateUrl: './height-weight.component.html',
    styleUrls: ['./height-weight.component.scss'],
    host: {
        'class': 'child-component'
    }
})
export class HeightWeightComponent implements OnInit {
    userDetails: any;
    @ViewChild('height') height: ElementRef;
    @ViewChild('weight') weight: ElementRef;


    constructor(private router: Router,
                private httpService: HttpServices,
                private userService: UserServices,
                private creationAccountService: CreateAccountService) {
    }

    ngOnInit(): void {
        this.userDetails = this.creationAccountService.userDetails.value;
    }

    onSubmit(form: NgForm) {
        const height = +this.height.nativeElement.value;
        const weight = +this.weight.nativeElement.value;
        const _id = this.userService.userId$.value;
        console.log(_id);
        const newUser = {...this.userDetails, height, weight};
        this.creationAccountService.userDetails.next(newUser);
        this.httpService.createUser({...newUser, _id}).subscribe(res => {
            this.userService.isAuth$.next(true);
            this.router.navigate(['/accueil']);
        })
    }

    goBack() {
        this.router.navigate(['creer-un-compte/sexe']);
    }
}
