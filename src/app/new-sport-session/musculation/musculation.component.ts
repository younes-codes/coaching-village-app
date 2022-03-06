import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-musculation',
  templateUrl: './musculation.component.html',
  styleUrls: ['./musculation.component.scss']
})
export class MusculationComponent implements OnInit {
  serieMuscuSelected: string;


  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

  }

  onChange(res: any) {
    this.serieMuscuSelected = res.value;
  }
}
