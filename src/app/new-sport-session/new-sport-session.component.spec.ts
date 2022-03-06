import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportSessionComponent } from './new-sport-session.component';

describe('NewSportSessionComponent', () => {
  let component: NewSportSessionComponent;
  let fixture: ComponentFixture<NewSportSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSportSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSportSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
