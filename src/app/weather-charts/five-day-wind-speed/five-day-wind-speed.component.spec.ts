import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayWindSpeedComponent } from './five-day-wind-speed.component';

describe('FiveDayWindSpeedComponent', () => {
  let component: FiveDayWindSpeedComponent;
  let fixture: ComponentFixture<FiveDayWindSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayWindSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayWindSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
