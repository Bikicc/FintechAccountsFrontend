import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../Services/AccountsService';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  Accounts: any = [];

  constructor(public accountService: AccountsService) { }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe((data) => {
      this.Accounts = data;
    },  (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }
}
