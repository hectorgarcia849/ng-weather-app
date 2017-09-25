import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from "../utils/functional-unit/functional-unit.component";

@Component({
  selector: 'app-five-day-wind',
  templateUrl: './five-day-wind.component.html',
  styleUrls: ['./five-day-wind.component.css']
})
export class FiveDayWindComponent implements OnInit, AbstractFunctionalUnit {
  name = 'five-day Wind';
  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any = '';
  @Input() viewContainerRef: ViewContainerRef;


  constructor() {
  }

  ngOnInit() {
  }

  onSelfDestruct() {
    this.onDestroy.emit(this.name);
  }
}
