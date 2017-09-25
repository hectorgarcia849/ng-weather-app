import {
  AfterViewInit, Component, OnDestroy, ViewChildren, ViewContainerRef
} from '@angular/core';
import {MdSelect} from '@angular/material';
import {HostDirective} from '../host.directive';
import {DataVisualizationService} from './services/data-visualization.service';
import {Subscription} from "rxjs/Subscription";
import {WeatherService} from "./services/weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  functionalUnitsList: string[] = ['5-day Humidity', '5-day Precipitation', '5-day Temp.', '5-day Wind'];

  @ViewChildren(HostDirective) host;

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue', child: ''},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen', child: ''},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink', child: ''},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1', child: ''}
  ];

  constructor(private dataVisualizationService: DataVisualizationService) {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  onUnitSelection(select: MdSelect) {
    if (this.functionalUnitsList.indexOf(select.value) >= 0) {
      const index = this.functionalUnitsList.indexOf(select.value);
      const selected = this.functionalUnitsList.splice(index, 1)[0];
      let viewContainerRef: ViewContainerRef;
      const hosts: HostDirective[] = this.host.toArray();
      for (let i = 0; i < hosts.length; i++) {
        if (hosts[i].viewContainerRef.length === 0) {
          viewContainerRef = hosts[i].viewContainerRef;
          this.tiles[i].child = selected;
          break;
        }
      }
      if (viewContainerRef) {
        this.dataVisualizationService.DVFactory(selected, viewContainerRef);

        //const unit = {name: selected, component: this.functionalUnitService.functionalUnitFactory(selected, viewContainerRef), viewContainerRef};
        //this.selectedFunctionalUnits.push(unit);
        //console.log('list', this.functionalUnitsList, 'created', this.selectedFunctionalUnits[this.selectedFunctionalUnits.length - 1]);

        // const indexOfLastElement = this.selectedFunctionalUnits.length - 1;
        // const componentFactory = this.componentFactoryResolver
        //   .resolveComponentFactory(this.selectedFunctionalUnits[indexOfLastElement].component);
        //viewContainerRef.clear();
        //const componentRef = viewContainerRef.createComponent(componentFactory);
        //(<AbstractFunctionalUnit>componentRef.instance).data = this.selectedFunctionalUnits[indexOfLastElement].data;
        //(<AbstractFunctionalUnit>componentRef.instance).viewContainerRef = viewContainerRef;

      }
    }
  }

  onRemoveUnit(i: number) {
    if (this.tiles[i].child !== '') {
      this.dataVisualizationService.removeDV(this.tiles[i].child);
      this.functionalUnitsList.push(this.tiles[i].child);
      this.functionalUnitsList.sort();
      this.tiles[i].child = '';
    }
  }
}
