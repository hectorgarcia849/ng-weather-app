import {EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';

export class AbstractFunctionalUnit {

  name: string;
  @Output() onDestroy: EventEmitter<string>;
  @Input() data: any;
  @Input() viewContainerRef: ViewContainerRef;
  constructor() {}

}
