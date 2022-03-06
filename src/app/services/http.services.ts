import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {UserServices} from "./user.services";
import {User} from "../models/user.model";
import {SeriesMusculation} from "./session.services";

@Injectable({providedIn: 'root'})
export class HttpServices {
  toto: string;

  constructor(private http: HttpClient, private userS: UserServices) {
    this.toto = userS.userId$.value;
  }


  fetchUsers() {
    return this.http
      .get<User>('http://localhost:3000/admin/users')
      .pipe(map((fetchedPosts: User) => {
        // Transform Object to an Array
        return Object.values(fetchedPosts);
      }));
  }

  updatePassword(email: string, password: string) {
    return this.http.put('http://localhost:3000/admin/edit-password', {email, password});
  }

  updateSessions(sessions: SeriesMusculation, userId: string) {
    return this.http.put('http://localhost:3000/sessions/update-sessions', {sessions, userId});
  }

  getSessions(userId: string) {
    return this.http.get<SeriesMusculation>('http://localhost:3000/sessions/sessions/' + userId)
      .pipe(map((sessions: SeriesMusculation) => {
        return sessions;
      }));
  }
}
