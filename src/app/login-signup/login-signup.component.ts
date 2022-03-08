import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-signup',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
    host: {
        'class': 'standard-component'
    }
})
export class LoginSignupComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }


    getTypeConnexion(typeConnexion: string) {
        const url = typeConnexion === 'creer-un-compte' ? 'creer-un-compte/email-mot-de-passe' : 'connexion';
        this.router.navigate([url]);
    }

}
