import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {UserServices} from "../../services/user.services";
import {NgForm} from "@angular/forms";
import {PlaceholderDirective} from "../../directives/placeholder.directive";
import {HiitComponent} from "./hiit/hiit.component";
import {MusculationComponent} from "./musculation/musculation.component";
import {SessionServices} from "../../services/session.services";

enum SessionEnum {
  MUSCULATION = 'musculation',
  HIIT = 'hiit',
  FRACTIONNE = 'fractionne',
  PLAGE = 'plage'
}

@Component({
  selector: 'app-new-sport-session',
  templateUrl: './new-sport-session.component.html',
  styleUrls: ['./new-sport-session.component.scss']
})

export class NewSportSessionComponent implements OnInit {

  constructor(private userS: UserServices,
              private sessionService: SessionServices,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  session: SessionEnum;
  @ViewChild('form') form: NgForm;
  @ViewChild(PlaceholderDirective, {static: false})
  sessionComponentHost: PlaceholderDirective;
  isSessionDone: boolean;

  ngOnInit(): void {
    this.userS.autoLogging();
    this.sessionService.sessionDone.subscribe(res => {
      this.isSessionDone = res;
      if (this.isSessionDone) {
        this.session = SessionEnum.HIIT;
        this.sessionComponentHost.viewContainerRef.clear();
      }
    })
  }

  onChange(res: any) {
    this.session = res.value;
    this.createSessionComponent(this.session);
  }


  onSubmit(form: NgForm) {
  }

  private createSessionComponent(session: SessionEnum | string): void {
    const sessionsComponent = {
      [SessionEnum.HIIT]: HiitComponent,
      [SessionEnum.MUSCULATION]: MusculationComponent,
    };

    // @ts-ignore
    const sessionComponent = sessionsComponent[session];
    const sessionFactory = this.componentFactoryResolver.resolveComponentFactory(sessionComponent);
    const hostViewContainerRef = this.sessionComponentHost?.viewContainerRef;
    if (hostViewContainerRef) {
      hostViewContainerRef.clear();
      hostViewContainerRef.createComponent(sessionFactory);
    }
  }
}
