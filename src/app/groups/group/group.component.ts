import {Component, Input, OnInit} from '@angular/core';
import {HttpServices} from "../../services/http.services";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() groupNumber: number;
  @Input() firstname: string;
  @Input() users: User[] = [];

  constructor(private httpService: HttpServices,
  ) {
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  private fetchUser(): void {
    this.httpService.fetchUsers()
      .subscribe((users) => {
        this.users = users[0];
      })
  }

}
