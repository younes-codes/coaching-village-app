import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
    host: {
        'class': 'standard-component'
    }
})
export class CreateAccountComponent implements OnInit {


    ngOnInit(): void {
    }

}
