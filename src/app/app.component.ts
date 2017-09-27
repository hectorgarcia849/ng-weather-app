import {
  AfterViewInit, Component, OnDestroy, Renderer2, ViewChildren, ViewContainerRef
} from '@angular/core';
import {MdGridTile, MdOption, MdSelect} from '@angular/material';
import {HostDirective} from '../host.directive';
import {DataVisualizationService} from './services/data-visualization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  functionalUnitsList: string[] = ['5-day Humidity', '5-day Precipitation', '5-day Temp.', '5-day Wind'];
  @ViewChildren('gridTile') gridTile;
  @ViewChildren(HostDirective) host;

  tiles = [];

  constructor(private dataVisualizationService: DataVisualizationService) {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  onUnitSelection(select: MdSelect) {

    if (this.functionalUnitsList.indexOf(select.value) >= 0) {
      // find and remove selected unit from the options list
      const index = this.functionalUnitsList.indexOf(select.value);
      const selected = this.functionalUnitsList.splice(index, 1)[0];
      // and create a new tile
      this.tiles.push({text: 'One', cols: 2, rows: 2, color: '#262626', child: selected});
      // places the code below in the callback queue, to ensure that the parent tile is rendered prior to attaching the component as a child.
      setTimeout(() => {
        const hosts: HostDirective[] = this.host.toArray();
        let viewContainerRef: ViewContainerRef;
        for (let i = 0; i < hosts.length; i++) {
          if (hosts[i].viewContainerRef.length === 0) {
            viewContainerRef = hosts[i].viewContainerRef;
            break;
          }
        }
        if (viewContainerRef) {
          this.dataVisualizationService.DVFactory(selected, viewContainerRef);
        }
      }, 0);
    }
  }
  onRemoveUnit(i: number) {
    if (this.tiles[i].child !== '') {
      this.dataVisualizationService.removeDV(this.tiles[i].child);
      this.functionalUnitsList.push(this.tiles[i].child);
      this.functionalUnitsList.sort();
      this.tiles[i].child = '';
      this.tiles.splice(i, 1);
    }
  }
}


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
