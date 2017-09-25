import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayTempComponent } from './five-day-temp.component';

describe('FiveDayTempComponent', () => {
  let component: FiveDayTempComponent;
  let fixture: ComponentFixture<FiveDayTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
