import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsPageModule } from './Employee/employee-details/employee-details.module';
import { EmployeeService } from './services/employee.service';
import { AddEmployeePageModule } from './Employee/add-employee/add-employee.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // For call Http Request
    HttpClientModule,
    // Page Modules
    EmployeeDetailsPageModule,
    AddEmployeePageModule,
  ],
  providers: [
    EmployeeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
