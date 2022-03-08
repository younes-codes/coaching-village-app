import {Component, OnInit} from '@angular/core';
import {AuthServices} from "../../services/auth.services";
import {User} from "../../models/user.model";
import {UserServices} from "../../services/user.services";

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    user: User;
    users: User[];
    groups: number[] = [];
    isLoading = true;

    constructor(private userServices: UserServices) {
    }

    getUsersByGroup(group: number): User[] {
        return this.users.filter(u => u.group === group);
    }

    ngOnInit(): void {
        this.user = this.userServices.user$.value;
        this.getUsersSortedByGroup();
    }

    getUsersSortedByGroup() {
        this.userServices
            .getUsersSortedByGroup()
            .subscribe(res => {
                    this.users = this.userServices.users$.value;
                    this.groups = this.userServices.usersSortedByGroup$.value;
                    this.isLoading = false;
                },
                error => {
                    this.isLoading = false;
                    throw error;
                })
    }

}
