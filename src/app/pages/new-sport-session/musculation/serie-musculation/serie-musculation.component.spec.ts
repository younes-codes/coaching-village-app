import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieMusculationComponent } from './serie-musculation.component';

describe('SerieMusculationComponent', () => {
  let component: SerieMusculationComponent;
  let fixture: ComponentFixture<SerieMusculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerieMusculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieMusculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
