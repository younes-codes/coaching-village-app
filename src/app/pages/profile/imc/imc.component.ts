import {Component, Input, Output, OnInit, EventEmitter, ElementRef} from '@angular/core';

@Component({
    selector: 'app-imc',
    templateUrl: './imc.component.html',
    styleUrls: ['./imc.component.scss']
})
export class ImcComponent implements OnInit {
    @Input() imc: number;

    @Output() closeImcComponent = new EventEmitter<void>();

    constructor(private host: ElementRef<HTMLElement>) {
    }


    ngOnInit(): void {
    }

    get container(): HTMLElement {
        return this.host.nativeElement.querySelector('.info-imc') as HTMLElement;
    }

    animationDone(event: AnimationEvent) {
        if (event.animationName === 'snackbarOut') {
            this.closeImcComponent.emit();
        }
    }

    hidePopin() {
        this.container.style.animation = 'snackbarOut .5s';
    }
}

