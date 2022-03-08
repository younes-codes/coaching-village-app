import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface SeriesMusculation {
    [key: string]: Serie[];
}

export interface Serie {
    charge: number | null,
    repetition: number | null,
}

export enum SessionEnum {
    MUSCULATION = 'musculation',
    HIIT = 'hiit',
    FRACTIONNE = 'fractionne',
    PLAGE = 'plage',
}

@Injectable({providedIn: 'root'})
export class SessionServices {
    constructor() {
    }

    sessionInProgress = new BehaviorSubject<SessionEnum>(<SessionEnum>'');
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

    getTotalesRep(series: Serie[]): number {
        return series.reduce((a, b) => a + (b['repetition'] || 0), 0);
    }

}
