import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserServices} from "./user.services";

export interface SeriesMusculation {
  [key: string]: Serie[];
}

export interface Serie {
  charge: number | null,
  repetition: number | null,
}

@Injectable({providedIn: 'root'})
export class SessionServices {
  constructor(private userService: UserServices) {
  }

  sessionDone = new BehaviorSubject<boolean>(false);
  seriesMusculation = new BehaviorSubject<SeriesMusculation>({
    ['developpe-couche']: [],
    ['incline']: [],
  });

  computeChargeMoyenne(series: Serie[]): number {
    const numberOfSeries = series.length;
    const chargeMoyenne = series.reduce((a, b) => a + (b['charge'] || 0), 0) / numberOfSeries;
    return +chargeMoyenne.toFixed(2);
  }

  computeRepetitions(series: Serie[]): number {
    return series.reduce((a, b) => a + (b['repetition'] || 0), 0);
  }

}
