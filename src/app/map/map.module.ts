import {NgModule} from "@angular/core";
import {MapComponent} from "./map.component";
import {SearchComponent} from "./search/search.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [MapComponent, SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeafletModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [MapComponent]
})

export class MapModule {}
