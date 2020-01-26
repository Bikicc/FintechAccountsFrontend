import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';


import { AccountsService } from './Services/AccountsService';
import { DeactivatedAccountsComponent } from './deactivated-accounts/deactivated-accounts.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    DeactivatedAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    AngularFontAwesomeModule,
    ToastModule,
    BrowserAnimationsModule,
    DialogModule,
    KeyFilterModule,
    DropdownModule,
    FormsModule
  ],

  providers: [
    AccountsService,
    MessageService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
