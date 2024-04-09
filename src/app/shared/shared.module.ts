import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent, FooterComponent,MapComponent]
})
export class SharedModule { }
