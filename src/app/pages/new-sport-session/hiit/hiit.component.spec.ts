import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiitComponent } from './hiit.component';

describe('HiitComponent', () => {
  let component: HiitComponent;
  let fixture: ComponentFixture<HiitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
