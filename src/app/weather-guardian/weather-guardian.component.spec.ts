import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherGuardianComponent } from './weather-guardian.component';

describe('WeatherGuardianComponent', () => {
  let component: WeatherGuardianComponent;
  let fixture: ComponentFixture<WeatherGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
