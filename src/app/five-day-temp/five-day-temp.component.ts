import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {multi, single} from '../../data';


@Component({
  selector: 'app-five-day-temp',
  templateUrl: './five-day-temp.component.html',
  styleUrls: ['./five-day-temp.component.css']
})
export class FiveDayTempComponent implements OnInit, AbstractFunctionalUnit {

  name = '5-day Temp.';
  single: any[];
  multi: any[];
  view: any[] = [500, 300];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any;
  @Input() viewContainerRef: ViewContainerRef;
  @ViewChild('unit') unit;

  constructor() {
    Object.assign(this, {single, multi});
  }

  ngOnInit() {
  }
  onSelfDestruct() {
  }

}
