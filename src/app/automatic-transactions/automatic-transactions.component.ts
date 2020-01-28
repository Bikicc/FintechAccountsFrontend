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

  constructor(
    public automaticTransactionsService: AutomaticTransactionsService,
    public accountService: AccountsService,
    public messageSerice: MessageService
  ) { }

  ngOnInit() {
    this.automaticTransactionsService.getAllAutomaticTransactions().subscribe((data) => {
      this.automaticActions = data;
      this.automaticActions.forEach(element => {
        this.automaticTransactionsService.getDestinationAccount(element.destinationAccount).subscribe((data) => {
          element.destAccount = data;
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
    if (this.Accounts.length > 1) {
      this.amountToTransfer = this.selectedAccountToTransferFrom.accountBalance;
      this.displayAutomaticAction = true;
    }
    else {
      this.messageSerice.add({ severity: 'error', summary: 'Error', detail: 'There is lack in accounts number' });
    }
  }

  closeTransferFundsToAccountDialog() {
    this.displayAutomaticAction = false;
  }

  onChangeFilterAccounts() {
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
    let params = {
      sourceAccount: this.selectedAccountToTransferFrom,
      destinationAccount: this.selectedAccountToTransferTo.id,
      excRate: this.condition,
      amount: this.amountToTransfer
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
            element.destAccount = data;
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
            element.destAccount = data;
          })
        });
      });
    });
  }
}
