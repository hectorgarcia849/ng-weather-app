import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from "../utils/functional-unit/functional-unit.component";

@Component({
  selector: 'app-five-day-precipitation',
  templateUrl: './five-day-precipitation.component.html',
  styleUrls: ['./five-day-precipitation.component.css']
})
export class FiveDayPrecipitationComponent implements OnInit, AbstractFunctionalUnit {
  name = 'five-day Precipitation';
  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any = '';
  @Input() viewContainerRef: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }
  onSelfDestruct() {
    this.onDestroy.emit(this.name);
  }
}
