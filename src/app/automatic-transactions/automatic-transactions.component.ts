import { exchangeRateService } from './../Services/exchangeRateService';
import { MessageService } from 'primeng/api';
import { AccountsService } from './../Services/AccountsService';
import { AutomaticTransactionsService } from './../Services/AutomaticTransactionsService';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-automatic-transactions',
  templateUrl: './automatic-transactions.component.html',
  styleUrls: ['./automatic-transactions.component.css']
})
export class AutomaticTransactionsComponent implements OnInit {

  automaticActions: any;
  displayAutomaticAction: boolean = false;
  Accounts: any;
  accountsTo: any;
  selectedAccountToTransferFrom: any;
  selectedAccountToTransferTo: any;
  amountToTransfer: number;
  condition: number;
  displayTable: boolean = false;
  rateToShow: number;

  constructor(
    public automaticTransactionsService: AutomaticTransactionsService,
    public accountService: AccountsService,
    public messageSerice: MessageService,
    public ExchangeRateService: exchangeRateService
  ) { }

  ngOnInit() {
    this.automaticTransactionsService.getAllAutomaticTransactions().subscribe((data) => {
      this.automaticActions = data;
      this.automaticActions.forEach(element => {
        this.automaticTransactionsService.getDestinationAccount(element.destinationAccount).subscribe((data) => {
          element.destinationAccount = data;
        })
      });
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

    this.accountService.getAllAccounts().subscribe((data) => {
      this.Accounts = data;
      this.selectedAccountToTransferFrom = data[0];
      this.accountsTo = this.Accounts.filter((e) => {
        return e.id != this.selectedAccountToTransferFrom.id
      })
      this.selectedAccountToTransferTo = this.accountsTo[0];
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  openAddNewAutomaticTransactionDialog() {
    let Account;

    if (this.Accounts.length > 1) {
      this.amountToTransfer = this.selectedAccountToTransferFrom.accountBalance;
      this.displayAutomaticAction = true;
      this.ExchangeRateService.getExchangeRateById(this.selectedAccountToTransferFrom.currency.code).subscribe((data: []) => {
        Account = data.filter((e: any) => {
          return e.exchangeCurrency === this.selectedAccountToTransferTo.currency.code
        })
        this.rateToShow = Account[0].rate
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }, () => { });
    }
    else {
      this.messageSerice.add({ severity: 'error', summary: 'Error', detail: 'There is lack in accounts number' });
    }
  }

  closeTransferFundsToAccountDialog() {
    this.displayAutomaticAction = false;
  }

  onChangeDisplayCurrentRate() {
    let Account;

    this.ExchangeRateService.getExchangeRateById(this.selectedAccountToTransferFrom.currency.code).subscribe((data: []) => {
      Account = data.filter((e: any) => {
        return e.exchangeCurrency === this.selectedAccountToTransferTo.currency.code
      })
      this.rateToShow = Account[0].rate
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  onChangeFilterAccounts() {
    let Account;

    this.ExchangeRateService.getExchangeRateById(this.selectedAccountToTransferFrom.currency.code).subscribe((data: []) => {
      Account = data.filter((e: any) => {
        return e.exchangeCurrency === this.selectedAccountToTransferTo.currency.code
      })
      this.rateToShow = Account[0].rate
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

    this.accountsTo = this.Accounts.filter((e) => {
      return e.id != this.selectedAccountToTransferFrom.id
    })
    this.amountToTransfer = this.selectedAccountToTransferFrom.accountBalance;
    this.selectedAccountToTransferTo = this.accountsTo[0];
  }

  closeInserNewAutomaticActionDialog() {
    this.displayAutomaticAction = false;
    this.condition = null;
  }

  addNewAutomaticAction() {
    if (this.condition > this.rateToShow) {
      var moreOrLess = true;
    }
    else {
      var moreOrLess = false;
    }

    let params = {
      sourceAccount: this.selectedAccountToTransferFrom,
      destinationAccount: this.selectedAccountToTransferTo.id,
      excRate: this.condition,
      amount: this.amountToTransfer,
      moreORless: moreOrLess
    }

    this.automaticTransactionsService.inserNewAutomaticTransactions(params).subscribe(() => {
      this.displayAutomaticAction = false;
      this.condition = null;
      this.amountToTransfer = null;
      this.messageSerice.add({ severity: 'success', summary: 'Success', detail: 'Automatic Action has been added successfully' });
      this.automaticTransactionsService.getAllAutomaticTransactions().subscribe((data) => {
        this.automaticActions = data;
        this.automaticActions.forEach(element => {
          this.automaticTransactionsService.getDestinationAccount(element.destinationAccount).subscribe((data) => {
            element.destinationAccount = data;
          })
        });
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

  DeleteAutomaticAction(automaticAction: any) {
    this.automaticTransactionsService.deleteAutomaticTransactions(automaticAction.id).subscribe(() => {
      this.automaticTransactionsService.getAllAutomaticTransactions().subscribe((data) => {
        this.automaticActions = data;
        this.automaticActions.forEach(element => {
          this.automaticTransactionsService.getDestinationAccount(element.destinationAccount).subscribe((data) => {
            element.destinationAccount = data;
          })
        });
      });
    });
  }

  onClickCheckAutomaticActions() {
    this.automaticTransactionsService.checkAutomaticActions().subscribe(() => {
      this.messageSerice.add({ severity: 'success', summary: 'Success', detail: 'Automatic Action has been checked successfully' });
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }
}
