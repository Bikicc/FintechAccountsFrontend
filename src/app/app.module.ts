import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';


import { AccountsService } from './Services/AccountsService';


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule
  ],

  providers: [
    AccountsService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
