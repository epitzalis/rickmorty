import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404.component';
import { Error404RoutingModule } from './error404.routing';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ],
  exports: [
    Error404Component
  ]
})
export class Error404Module { }
