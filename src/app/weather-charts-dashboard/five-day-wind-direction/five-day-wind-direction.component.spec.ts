import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayWindDirectionComponent } from './five-day-wind-direction.component';

describe('FiveDayWindDirectionComponent', () => {
  let component: FiveDayWindDirectionComponent;
  let fixture: ComponentFixture<FiveDayWindDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayWindDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayWindDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
