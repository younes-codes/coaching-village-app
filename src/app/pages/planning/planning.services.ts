import {Injectable} from "@angular/core";
import {Planning, PLANNINGS, Session} from "./plannings.data";
import {User} from "../../models/user.model";
import {UserServices} from "../../services/user.services";

@Injectable({providedIn: 'root'})
export class PlanningServices {
    userGroup: number | undefined;

    constructor(private userS: UserServices) {
        this.userGroup = this.userS.user$.value.group;
    }

    getNextSession(): Session {
        const currentDay = new Date().toLocaleString('en-us', {weekday: 'long'}).toLowerCase();
        const hours = new Date().getHours();
        const planning = this.getUserPlanning();
        const currentDayPlanning = planning.days.find(d => d.day === currentDay)!;
        if (hours >= 5 && hours < 9) {
            return {session: 'petit déjeuner', time: '8h', img: '../assets/petit-dejeuner.jpg'};
        } else if (hours >= 9 && hours < 12) {
            return currentDayPlanning['morning'][0];
        } else if (hours >= 12 && hours < 14) {
            return {session: 'déjeuner', time: '13h', img: ''};
        } else if (hours >= 14 && hours < 16) {
            return {session: 'collation', time: '16h', img: ''};
        } else if (hours >= 16 && hours <= 19) {
            return currentDayPlanning['afternoon'][0];
        } else if (hours >= 19 && hours <= 22) {
            return {session: 'diner', time: '20h', img: ''};
        } else {
            return {session: 'bonne nuit', time: '😴', img: ''};
        }
    }

    getUserPlanning(): Planning {
        return PLANNINGS.find(p => p.group === this.userGroup)!;
    }
}
