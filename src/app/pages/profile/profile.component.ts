import {
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {UserServices} from "../../services/user.services";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../../directives/placeholder.directive";
import {ImcComponent} from "./imc/imc.component";
import {Subscription} from "rxjs";
import openSocket from "socket.io-client";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    user: User;
    date: string;
    imc: number;
    @ViewChild(PlaceholderDirective, {static: false})
    sessionComponentHost: PlaceholderDirective;
    private closeSub: Subscription;


    constructor(private userService: UserServices,
                private componentFactoryResolver: ComponentFactoryResolver,
                private router: Router) {
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.user = this.userService.user$.value;
        const date = new Date(this.user.createdAt!);
        this.date = date.toLocaleDateString('fr');
        this.imc = this.userService.getImc();
        const socket = openSocket(environment.urlAPI);
        socket.on('USER_VALIDATED', data => {
            if (data.action === 'VALIDATION_USER') {
                this.userService.user$.next({
                    ...this.user,
                    isValidated: data.isValidated
                });
                this.user = this.userService.user$.value;
            }
        })
    }

    logout() {
        this.userService.isAuth$.next(false);
        localStorage.clear();
        this.router.navigate(['/connexion']);
    }

    private createImcComponent(): void {
        const imcFactory = this.componentFactoryResolver.resolveComponentFactory(ImcComponent);
        const hostViewContainerRef = this.sessionComponentHost?.viewContainerRef;
        if (hostViewContainerRef) {
            hostViewContainerRef.clear();
            const imcComponent = hostViewContainerRef.createComponent(imcFactory);
            imcComponent.instance.imc = this.imc;
            this.closeSub = imcComponent.instance.closeImcComponent.subscribe(() => {
                document.body.style.overflow = 'scroll';
                this.closeSub.unsubscribe();
                hostViewContainerRef.clear();
            })
        }
    }

    showImcPopin() {
        document.body.style.overflow = 'hidden';
        this.createImcComponent();
    }
}
