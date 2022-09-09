import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionsComponent } from './components/actions/actions.component';
import { TimerComponent } from './components/timer/timer.component';
import { ResultComponent } from './components/result/result.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ButtonComponent } from './components/actions/components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {NgArrayPipesModule, NgDatePipesModule} from "ngx-pipes";
import {FormatTimePipe} from "./shared/pipes/format-time.pipe";
import {HoverDirective} from "./shared/directive/hover.directive";
import {SortBy} from "./shared/pipes/sortBy";

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    TimerComponent,
    ResultComponent,
    DashboardComponent,
    ButtonComponent,
    FormatTimePipe,
    SortBy,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgDatePipesModule,
    NgArrayPipesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
