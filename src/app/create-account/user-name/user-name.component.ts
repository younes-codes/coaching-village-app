import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateAccountService} from "../create-account.service";

@Component({
    selector: 'app-user-name',
    templateUrl: './user-name.component.html',
    styleUrls: ['./user-name.component.scss'],
    host: {
        'class': 'standard-component'
    }
})
export class UserNameComponent implements OnInit {
    userDetails: any;
    @ViewChild('firstname') firstname: ElementRef;
    @ViewChild('lastname') lastname: ElementRef;

    constructor(private router: Router, private creationAccountService: CreateAccountService) {
    }

    ngOnInit(): void {
        this.userDetails = this.creationAccountService.userDetails.value;
    }

    onSubmit(form: NgForm) {
        const firstname = this.firstname.nativeElement.value;
        const lastname = this.lastname.nativeElement.value;
        const newUser = {...this.userDetails, firstname, lastname};
        this.creationAccountService.userDetails.next(newUser);
        this.router.navigate(['creer-un-compte/sexe']);
    }

    goBack() {
        this.router.navigate(['creer-un-compte/email-mot-de-passe']);
    }
}
