import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionneComponent } from './fractionne.component';

describe('FractionneComponent', () => {
  let component: FractionneComponent;
  let fixture: ComponentFixture<FractionneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FractionneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
