import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {UserServices} from "./user.services";
import {User} from "../models/user.model";
import {SeriesMusculation} from "./session.services";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class HttpServices {
  toto: string;

  constructor(private http: HttpClient, private userS: UserServices) {
    this.toto = userS.userId$.value;
  }


  fetchUsers() {
    return this.http
      .get<User>(`${environment.urlAPI}/admin/users`)
      .pipe(map((fetchedPosts: User) => {
        // Transform Object to an Array
        return Object.values(fetchedPosts);
      }));
  }

  updatePassword(email: string, password: string) {
    return this.http.put(`${environment.urlAPI}/admin/edit-password`, {email, password});
  }

  updateSessions(sessions: SeriesMusculation, userId: string) {
    return this.http.put(`${environment.urlAPI}/sessions/update-sessions`, {sessions, userId});
  }

  getSessions(userId: string) {
    return this.http.get<SeriesMusculation>(`${environment.urlAPI}/sessions/sessions/${userId}`)
      .pipe(map((sessions: SeriesMusculation) => {
        return sessions;
      }));
  }
}
