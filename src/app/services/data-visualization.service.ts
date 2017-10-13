import {Component, ComponentFactoryResolver, Injectable, Type, ViewContainerRef} from '@angular/core';
import {SixteenDayTempComponent} from '../weather-charts-dashboard/sixteen-day-temp/sixteen-day-temp.component';
import {FiveDayWindSpeedComponent} from '../weather-charts-dashboard/five-day-wind-speed/five-day-wind-speed.component';
import {FiveDayHumidityComponent} from '../weather-charts-dashboard/five-day-humidity/five-day-humidity.component';
import {FiveDayWindDirectionComponent} from '../weather-charts-dashboard/five-day-wind-direction/five-day-wind-direction.component';

@Injectable()

export class DataVisualizationService {

  private viewContainers: {viewContainerRef: ViewContainerRef, child: string}[] = [];
  chartComponents: {name: string, component: Component}[] = [
    {name: '16-day Temp.', component: SixteenDayTempComponent},
    {name: '5-day Wind Speed', component: FiveDayWindSpeedComponent},
    {name: '5-day Humidity', component: FiveDayHumidityComponent},
    {name: '5-day Wind Direction', component: FiveDayWindDirectionComponent}];
  chartNames = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.populateChartNames();
  }
  removeDV(name: string) {
    const len: number = this.viewContainers.length;
    for (let i = 0; i < len; i++) {
      if (this.viewContainers[i].child === name) {
        this.viewContainers[i].viewContainerRef.clear();
        return this.viewContainers.splice(i, 1);
      }
    }
  }
  private populateChartNames() {
    this.chartComponents.forEach((chart) => this.chartNames.push(chart.name));
  }
  DVFactory(name: string, viewContainerRef: ViewContainerRef) {
    this.chartComponents.forEach((chart) => {
      if (chart.name === name) {
        this.insertViewContainerRef(viewContainerRef, chart.name);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<Type<any>>chart.component);
        return viewContainerRef.createComponent(componentFactory);
      }
    });
  }
  private insertViewContainerRef(viewContainerRef: ViewContainerRef, child: string) {
    this.viewContainers.push({viewContainerRef, child});
  }
}
