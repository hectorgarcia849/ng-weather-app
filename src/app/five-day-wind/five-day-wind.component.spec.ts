import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayWindComponent } from './five-day-wind.component';

describe('FiveDayWindComponent', () => {
  let component: FiveDayWindComponent;
  let fixture: ComponentFixture<FiveDayWindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayWindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
