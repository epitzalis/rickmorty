import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { FiltersModule } from '@components/filters/filters.module';
import { CardModule } from '@components/card/card.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FiltersModule,
    CardModule,
    TranslateModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
