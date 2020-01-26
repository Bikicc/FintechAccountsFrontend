import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../Services/AccountsService';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  Accounts: any = [];
  displayAddNewAcc: boolean = false;
  accountTypes: any = [];
  selectedAccType: any;
  currencies: any;
  selectedCurrency: any;
  balance: any;

  constructor(
    private accountService: AccountsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe((data) => {
      this.formatDates(data);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  deleteAccount(account: any) {
    this.accountService.deleteAccount(account).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been deleted successfully' });
      this.accountService.getAllAccounts().subscribe((data) => {
        this.formatDates(data);
      });
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  formatDates(accounts) {
    accounts.forEach(element => {
      element.expiryDate = element.expiryDate.split('T')[0];
      element.startDate = element.startDate.split('T')[0];
    });

    this.Accounts = accounts;
  }

  openAddNewAccountDialog() {
    this.accountService.gettAllCurrencies().subscribe((data) => {
      this.currencies = data;
      this.selectedCurrency = data[0];
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

    this.accountService.getAccTypes().subscribe((data) => {
      this.accountTypes = data;
      this.selectedAccType = data[0];
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

    this.displayAddNewAcc = true;
  }

  closeAddNewAccDialog() {
    this.displayAddNewAcc = false;
  }

  addNewAccount() {
    let params = {
      type: this.selectedAccType,
      currency: this.selectedCurrency,
      accountBalance: this.balance
    }

    this.accountService.addNewAccount(params).subscribe(() => {
      this.displayAddNewAcc = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been added successfully' });
      this.accountService.getAllAccounts().subscribe((data) => {
        this.formatDates(data);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }, () => { });
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

  }
}
