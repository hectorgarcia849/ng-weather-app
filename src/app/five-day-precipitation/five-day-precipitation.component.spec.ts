import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayPrecipitationComponent } from './five-day-precipitation.component';

describe('FiveDayPrecipitationComponent', () => {
  let component: FiveDayPrecipitationComponent;
  let fixture: ComponentFixture<FiveDayPrecipitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayPrecipitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayPrecipitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
