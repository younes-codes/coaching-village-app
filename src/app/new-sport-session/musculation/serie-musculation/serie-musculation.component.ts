import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Serie, SeriesMusculation, SessionServices} from "../../../services/session.services";
import {Router} from "@angular/router";
import {HttpServices} from "../../../services/http.services";
import {UserServices} from "../../../services/user.services";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-serie-musculation',
  templateUrl: './serie-musculation.component.html',
  styleUrls: ['./serie-musculation.component.scss']
})
export class SerieMusculationComponent implements OnInit, OnChanges {

  charge: number | null;
  repetition: number | null;
  series: Serie[];
  editMode = {index: 0, isEditing: false};
  seriesMusculation: SeriesMusculation;
  isLoading = true;
  @Input() serie: string;
  @ViewChild('form') form: NgForm;

  constructor(private sessionService: SessionServices,
              private httpServices: HttpServices,
              private userServices: UserServices,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = !this.seriesMusculation;
    this.seriesMusculation = this.sessionService.seriesMusculation.value;
  }


  ngOnChanges(changes: SimpleChanges) {
    this.serie = changes.serie.currentValue;
    this.seriesMusculation = this.sessionService.seriesMusculation.value;
    this.series = this.seriesMusculation[this.serie];
  }

  onSubmit(form: NgForm) {
    const userId = this.userServices.userId$.value;

    this.sessionService.seriesMusculation.next(this.seriesMusculation);
    this.httpServices.updateSessions(this.seriesMusculation, userId).subscribe(res => {
      this.router.navigate(['/accueil']);
    });
  }

  createNewSerie() {
    if (!this.charge || !this.repetition) return;
    if (this.editMode.isEditing) {
      this.seriesMusculation[this.serie][this.editMode.index].charge = this.charge;
      this.seriesMusculation[this.serie][this.editMode.index].repetition = this.repetition;
      this.editMode.isEditing = false;
      this.charge = null;
      this.repetition = null;
      return;
    }
    this.seriesMusculation[this.serie].push({charge: this.charge, repetition: this.repetition});
    this.charge = null;
    this.repetition = null;
    this.getRepetitions();
  }

  deleteById(i: number) {
    this.series.splice(i, 1);
  }

  editById(i: number) {
    this.editMode = {index: i, isEditing: true};
    this.charge = this.series[i].charge;
    this.repetition = this.series[i].repetition;
  }

  getChargeMoyenne(): number {
    return this.sessionService.computeChargeMoyenne(this.series);
  }

  getRepetitions(): number {
    return this.sessionService.computeRepetitions(this.series);
  }
}
