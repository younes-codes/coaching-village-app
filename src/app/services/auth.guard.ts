import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserServices} from "./user.services";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserServices, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.userService.isAuth$.value) {
      return true;
    }
    return this.router.createUrlTree(['connexion']);
  };
}
