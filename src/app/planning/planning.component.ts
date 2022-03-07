import {Component, OnInit} from '@angular/core';
import {Planning, PLANNINGS} from "./plannings.data";
import {UserServices} from "../services/user.services";
import {User} from "../models/user.model";
import {PlanningServices} from "./planning.services";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  user: User;
  userPlanning: Planning;
  isLoading = true;
  isAuth: boolean;

  constructor(private userService: UserServices, private planningServices: PlanningServices) {
  }

  ngOnInit(): void {
    this.userService.autoLogging();
    this.user = this.userService.user$.value;
    console.log(this.user)
    this.userPlanning = this.planningServices.getUserPlanning(this.user);
    this.userService.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth;
      this.isLoading = false;
    })
  }
}
