import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {UserServices} from "../services/user.services";
import {SeriesMusculation, SessionServices} from "../services/session.services";
import {tap} from "rxjs/operators";
import {HttpServices} from "../services/http.services";
import {PlanningServices} from "../planning/planning.services";
import {Session} from "../planning/plannings.data";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: User;
  musculationSessions: SeriesMusculation;
  series = ['developpe-couche', 'incline'];
  isLoading = true;
  nextSession: Session;

  constructor(private userServices: UserServices,
              private httpServices: HttpServices,
              private planningServices: PlanningServices,
              private sessionServices: SessionServices) {
  }

  ngOnInit(): void {
    this.userServices.autoLogging();
    this.user = this.userServices.user$.value;
    const userId = this.userServices.userId$.value;
    this.httpServices.getSessions(userId)
      .pipe(tap((resData) => {
        this.sessionServices.seriesMusculation.next(resData);
        this.musculationSessions = resData;
        this.isLoading = false;
      }))
      .subscribe()
    this.nextSession = this.planningServices.getNextSession(this.user);
  }


  getTotalSeries(result: string): string {
    let nbSerie = 0;
    if (this.musculationSessions) {
      nbSerie = this.musculationSessions[result]?.length;
      return nbSerie <= 1 ? `#${nbSerie} série` : `#${nbSerie} séries`
    }
    return `#${nbSerie} série`
  }

  geTotalRepetitions(result: string): number {
    if (this.musculationSessions) {
      return this.sessionServices.computeRepetitions(this.musculationSessions[result])
    }
    return 0;
  }

  getChargeMoyenne(result: string): number {
    if (!this.musculationSessions[result].length) {
      return 0;
    }
    return this.sessionServices.computeChargeMoyenne(this.musculationSessions[result]);
  }
}
