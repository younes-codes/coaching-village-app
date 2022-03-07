import {Injectable} from "@angular/core";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserServices {
  constructor(private http: HttpClient) {
  }

  userId$ = new BehaviorSubject<string>('');
  // @ts-ignore
  user$ = new BehaviorSubject<User>(null);
  isAuth$ = new BehaviorSubject<boolean>(false);

  login(email: string, password: string) {
    return this.http.post<{ token: string, userId: string, user: User }>(`${environment.urlAPI}/admin/login`, {
      email,
      password
    }).pipe(
      catchError((errorRes) => {
        let errorMessage = 'Erreur inconnue';
        if (!errorRes.error || !errorRes.error.message) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.message) {
          case 'EMAIL_NOT_EXISTS':
            errorMessage = 'Le compte nexiste pas.';
            break;
          case 'WRONG_PASSWORD':
            errorMessage = 'Mauvais mot de passe'
        }
        return throwError(errorMessage)
      }),
      tap(resData => {
        localStorage.setItem('userId', JSON.stringify(resData.userId));
        localStorage.setItem('user', JSON.stringify(resData.user));
        localStorage.setItem('token', JSON.stringify(resData.token));
        this.userId$.next(resData.userId);
        this.user$.next(resData.user);
      })
    );
  }

  getUserById(userId: string) {
    return this.http
      .get<User>(`${environment.urlAPI}/admin/get-user/${userId}`)
      .pipe(map((userReq: User) => {
        const user: User = Object.values(userReq)[0];
        this.user$.next(user);
        console.log(this.user$.value)
      }));
  }

  autoLogging() {
    const userId = localStorage.getItem('userId');
    const user = localStorage.getItem('user');
    // @ts-ignore
    // const userParsed = JSON.parse(user);
    // @ts-ignore
    this.userId$.next(JSON.parse(userId));
    // @ts-ignore
    // this.user$.next(userParsed);
    if (userId) {
      this.isAuth$.next(true);
    }
  }


}
