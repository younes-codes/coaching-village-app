import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {UserServices} from "./user.services";
import {User} from "../models/user.model";
import {SeriesMusculation} from "./session.services";
import {environment} from "../../environments/environment";
import {throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpServices {
    userId: string;

    constructor(private http: HttpClient, private userS: UserServices) {
        this.userId = userS.userId$.value;
    }


    fetchUsers() {
        return this.http
            .get<User>(`${environment.urlAPI}/admin/users`)
            .pipe(map((fetchedPosts: User) => {
                // Transform Object to an Array
                return Object.values(fetchedPosts);
            }));
    }

    checkEmail(email: string) {
        return this.http.post(`${environment.urlAPI}/admin/check-email`, {email})
            .pipe(
                catchError((errorRes) => {
                    let errorMessage = 'Erreur inconnue';
                    if (!errorRes.error || !errorRes.error.data) {
                        return throwError(errorMessage);
                    }
                    switch (errorRes.error.data[0].msg) {
                        case 'EMAIL_FORMAT_INCORRECT':
                            errorMessage = 'Format de l\'email incorrect.';
                            break;
                        case 'EMAIL_EXISTS':
                            errorMessage = 'L\'adresse email existe déjà.'
                    }
                    return throwError(errorMessage)
                })
            )
    }

    createUser(user: User) {
        return this.http.post(`${environment.urlAPI}/admin/create-user`, {user})
    }

    updatePassword(email: string, password: string) {
        return this.http.put(`${environment.urlAPI}/admin/edit-password`, {
            email,
            password
        });
    }

    updateSessions(sessions: SeriesMusculation, userId: string) {
        return this.http.put(`${environment.urlAPI}/sessions/update-sessions`, {
            sessions,
            userId
        });
    }

    getSessions(userId: string) {
        return this.http.get<SeriesMusculation>(`${environment.urlAPI}/sessions/sessions/${userId}`)
            .pipe(map((sessions: SeriesMusculation) => {
                return sessions;
            }));
    }
}
