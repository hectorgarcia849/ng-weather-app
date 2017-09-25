import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayHumidityComponent } from './five-day-humidity.component';

describe('FiveDayHumidityComponent', () => {
  let component: FiveDayHumidityComponent;
  let fixture: ComponentFixture<FiveDayHumidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayHumidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
