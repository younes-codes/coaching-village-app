import {Component, OnInit} from '@angular/core';
import {Planning} from "./plannings.data";
import {PlanningServices} from "./planning.services";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

    userPlanning: Planning;

    constructor(private planningServices: PlanningServices) {
    }

    ngOnInit(): void {
        this.userPlanning = this.planningServices.getUserPlanning();
    }
}
