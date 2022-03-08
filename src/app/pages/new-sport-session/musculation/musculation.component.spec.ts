import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusculationComponent } from './musculation.component';

describe('MusculationComponent', () => {
  let component: MusculationComponent;
  let fixture: ComponentFixture<MusculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
