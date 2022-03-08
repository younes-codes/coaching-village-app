import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {UserServices} from "../../../services/user.services";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @Input() groupNumber: number;
    @Input() firstname: string;
    @Input() users: User[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
