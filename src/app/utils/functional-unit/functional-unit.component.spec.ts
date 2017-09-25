import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalUnitComponent } from './functional-unit.component';

describe('FunctionalUnitComponent', () => {
  let component: FunctionalUnitComponent;
  let fixture: ComponentFixture<FunctionalUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
