import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UserServices {
  constructor(private http: HttpClient) {
  }

  userId$ = new BehaviorSubject<string>('');
  // @ts-ignore
  user$ = new BehaviorSubject<User>(null);
  isAuth$ = new BehaviorSubject<boolean>(false);

  login(email: string, password: string) {
    return this.http.post<{ token: string, userId: string, user: User }>('http://localhost:3000/admin/login', {
      email,
      password
    }).pipe(
      tap(resData => {
        localStorage.setItem('userId', JSON.stringify(resData.userId));
        localStorage.setItem('user', JSON.stringify(resData.user));
        this.userId$.next(resData.userId);
        this.user$.next(resData.user);
      })
    );
  }

  autoLogging() {
    const userId = localStorage.getItem('userId');
    const user = localStorage.getItem('user');
    // @ts-ignore
    const userParsed = JSON.parse(user);
    // @ts-ignore
    this.userId$.next(JSON.parse(userId));
    // @ts-ignore
    this.user$.next(userParsed);
    if (userId) {
      this.isAuth$.next(true);
    }
  }

}
