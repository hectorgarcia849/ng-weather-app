import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixteenDayTempComponent } from './sixteen-day-temp.component';

describe('FiveDayTempComponent', () => {
  let component: SixteenDayTempComponent;
  let fixture: ComponentFixture<SixteenDayTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixteenDayTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixteenDayTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
