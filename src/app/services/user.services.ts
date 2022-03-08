import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserServices {
    constructor(private http: HttpClient) {
    }

    userId$ = new BehaviorSubject<string>('');
    // @ts-ignore
    user$ = new BehaviorSubject<User>({});
    users$ = new BehaviorSubject<User[]>([]);
    usersSortedByGroup$ = new BehaviorSubject<any>([])
    isAuth$ = new BehaviorSubject<boolean>(false);

    fetchUsers() {
        return this.http
            .get<User>(`${environment.urlAPI}/admin/users`)
            .pipe(map((fetchedPosts: User) => {
                // Transform Object to an Array
                return Object.values(fetchedPosts);
            }));
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
        this.userId$.next(JSON.parse(userId));
        // @ts-ignore
        this.user$.next(JSON.parse(user));
        if (userId) {
            this.isAuth$.next(true);
        }

    }

    getImc = (): number => {
        const height = this.user$.value.height!;
        const weight = this.user$.value.weight!;
        const h = height / 100;
        return +((weight) / (h * h)).toFixed(1);
    }


    getUsersSortedByGroup() {
        return this.fetchUsers()
            .pipe(map((users: User[][]) => {
                this.users$.next(users[0])
                const arrayGroup: number[] = [];
                users[0].forEach((u: User) => {
                    arrayGroup.push(u.group!);
                    this.usersSortedByGroup$.next([...new Set(arrayGroup)].sort());
                })
            }))
    }


}
