import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';

@Component({
  selector: 'app-five-day-humidity',
  templateUrl: './five-day-humidity.component.html',
  styleUrls: ['./five-day-humidity.component.css']
})
export class FiveDayHumidityComponent implements OnInit, AbstractFunctionalUnit {
  name = 'five-day humidity';

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
