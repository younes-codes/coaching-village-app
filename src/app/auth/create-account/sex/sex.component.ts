import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CreateAccountService} from "../create-account.service";

@Component({
    selector: 'app-sex',
    templateUrl: './sex.component.html',
    styleUrls: ['./sex.component.scss'],
    host: {
        'class': 'child-component'
    }
})
export class SexComponent implements OnInit {
    userDetails: any;

    constructor(private router: Router, private creationAccountService: CreateAccountService) {
    }

    ngOnInit(): void {
        this.userDetails = this.creationAccountService.userDetails.value;
    }

    next(sex: string) {
        const newUser = {...this.userDetails, sex};
        this.creationAccountService.userDetails.next(newUser);
        this.router.navigate(['creer-un-compte/taille-poids']);
    }

    goBack() {
        this.router.navigate(['creer-un-compte/idendite']);
    }
}
