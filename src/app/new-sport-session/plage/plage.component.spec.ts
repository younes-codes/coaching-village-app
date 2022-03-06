import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlageComponent } from './plage.component';

describe('PlageComponent', () => {
  let component: PlageComponent;
  let fixture: ComponentFixture<PlageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
