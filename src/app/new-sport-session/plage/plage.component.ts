import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plage',
  templateUrl: './plage.component.html',
  styleUrls: ['./plage.component.scss']
})
export class PlageComponent implements OnInit {

// @ts-ignore
  beachSession = new BehaviorSubject<{ time: number, kmh: number }>(null);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const time = form.value.time;
    const distance = 2500;
    const kmh = +((distance / time * 60) * 3.6).toFixed(2);
    this.beachSession.next({time, kmh});
    this.router.navigate(['/nouvelle-seance']);
  }
}
