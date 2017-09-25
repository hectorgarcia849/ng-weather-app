import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {FiveDayTempComponent} from '../five-day-temp/five-day-temp.component';
import {FiveDayWindComponent} from '../five-day-wind/five-day-wind.component';
import {FiveDayHumidityComponent} from '../five-day-humidity/five-day-humidity.component';
import {FiveDayPrecipitationComponent} from '../five-day-precipitation/five-day-precipitation.component';

@Injectable()

//rename to DataVisualizationService
export class DataVisualizationService {

  private viewContainers: {viewContainerRef: ViewContainerRef, child: string}[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  removeDV(name: string) {
    const len: number = this.viewContainers.length;
    for (let i = 0; i < len; i++) {
      if (this.viewContainers[i].child === name) {
        this.viewContainers[i].viewContainerRef.clear();
        return this.viewContainers.splice(i, 1);
      }
    }
  }
  DVFactory(name: string, viewContainerRef: ViewContainerRef) {
    switch (name) {
      case '5-day Temp.': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayTempComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        //(<AbstractFunctionalUnit>componentRef.instance).data = this.selectedFunctionalUnits[indexOfLastElement].data;
        //(<AbstractFunctionalUnit>componentRef.instance).viewContainerRef = viewContainerRef;
        break;
      }
      case '5-day Wind': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayWindComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
      case '5-day Humidity': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayHumidityComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
      case '5-day Precipitation': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayPrecipitationComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
    }
  }
}
