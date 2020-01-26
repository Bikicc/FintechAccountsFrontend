import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../Services/AccountsService';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deactivated-accounts',
  templateUrl: './deactivated-accounts.component.html',
  styleUrls: ['./deactivated-accounts.component.css']
})
export class DeactivatedAccountsComponent implements OnInit {

  DeactivatedAcc: any = [];


  constructor(
    private accountService: AccountsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.accountService.getAllDeactivatedAccounts().subscribe((data) => {
      this.formatDates(data);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }


  activateAccount(account: any) {
    this.accountService.activateAccount(account).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been activated successfully' });
      this.accountService.getAllDeactivatedAccounts().subscribe((data) => {
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

    this.DeactivatedAcc = accounts;
  }

}
