import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {SixteenDayTempComponent} from '../weather-charts-dashboard/sixteen-day-temp/sixteen-day-temp.component';
import {FiveDayWindSpeedComponent} from '../weather-charts-dashboard/five-day-wind-speed/five-day-wind-speed.component';
import {FiveDayHumidityComponent} from '../weather-charts-dashboard/five-day-humidity/five-day-humidity.component';
import {FiveDayWindDirectionComponent} from '../weather-charts-dashboard/five-day-wind-direction/five-day-wind-direction.component';

@Injectable()

export class DataVisualizationService {

  private viewContainers: {viewContainerRef: ViewContainerRef, child: string}[] = [];
  charts = ['16-day Temp.', '5-day Wind Speed', '5-day Humidity', '5-day Wind Direction'];

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
      case '16-day Temp.': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SixteenDayTempComponent);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        //(<AbstractFunctionalUnit>componentRef.instance).data = this.selectedFunctionalUnits[indexOfLastElement].data;
        //(<AbstractFunctionalUnit>componentRef.instance).viewContainerRef = viewContainerRef;
        break;
      }
      case '5-day Wind Speed': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayWindSpeedComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
      case '5-day Humidity': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayHumidityComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
      case '5-day Wind Direction': {
        this.viewContainers.push({viewContainerRef, child: name});
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FiveDayWindDirectionComponent);
        return viewContainerRef.createComponent(componentFactory);
      }
    }
  }
}
