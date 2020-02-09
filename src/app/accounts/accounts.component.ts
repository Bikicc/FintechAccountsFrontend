import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../Services/AccountsService';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { exchangeRateService } from './../Services/exchangeRateService';



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  Accounts: any = [];
  AccountsToTransferTo: any = [];
  displayAddNewAcc: boolean = false;
  displayTransferFunds: boolean = false;
  selectedAccType: any;
  currencies: any;
  selectedCurrency: any;
  balance: any;
  balanceToTransfer: Number;
  selectedAccountTransferFrom: any;
  selectedAccountToTransferTo: any;
  nonExistentAccounts: any = [];
  displayDeleteDialog: boolean = false;
  displayAccountHistoryDialog: boolean = false;
  accountHistoryActivity: any;
  setActivityHistoryAccount: String;
  rateToShow: number;
  displayMakeTransferDialog: boolean = false;
  exchangeRates: any[];
  selectedCurrencyToTransferTo: any = {};
  displayAddToBalanceDialog: boolean = false;


  constructor(
    private accountService: AccountsService,
    private messageService: MessageService,
    public ExchangeRateService: exchangeRateService
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

    this.ExchangeRateService.getAllExchangeRates().subscribe((data: []) => {
      this.exchangeRates = data;
      this.selectedCurrencyToTransferTo = this.exchangeRates[0];
    })
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
      this.nonExistentAccounts = this.removeExistingAccounts(data);
      this.selectedCurrency = this.nonExistentAccounts[0];
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
    this.balance = null;
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
      this.balance = null;
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

  openTransferFundsDialog(account) {
    let Account;
    this.selectedAccountTransferFrom = account;
    this.ExchangeRateService.getExchangeRateById(this.selectedAccountTransferFrom.currency.code).subscribe((data: []) => {
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
    this.displayTransferFunds = true;
    this.balanceToTransfer = this.selectedAccountTransferFrom.accountBalance;
    this.AccountsToTransferTo = this.Accounts.filter((e) => {
      return e.id != this.selectedAccountTransferFrom.id
    })
    this.selectedAccountToTransferTo = this.AccountsToTransferTo[0];
  }

  closeTransferFundsToAccountDialog() {
    this.selectedAccountTransferFrom = null;
    this.displayTransferFunds = false;
    this.balanceToTransfer = 0;
  }

  transferFundsToAccount() {
    let params = {
      accountFrom: this.selectedAccountTransferFrom,
      accountTo: this.selectedAccountToTransferTo,
      balanceToTransfer: this.balanceToTransfer
    }
    this.accountService.transferFundsToAccount(params).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Funds has been transfered successfully' });
      this.balanceToTransfer = null;
      this.selectedAccountTransferFrom = null;
      this.accountService.getAllAccounts().subscribe((data) => {
        this.formatDates(data);
      });
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => {
      this.displayTransferFunds = false;
    });
  }

  removeExistingAccounts(data) {
    this.currencies = data;
    let currenciesIdArray = [];

    for (let i = 0; i < this.Accounts.length; i++) {
      currenciesIdArray.push(this.Accounts[i].currency.id)
    }

    let currenciesToDisplay = this.currencies.filter((e) => {
      return !currenciesIdArray.includes(e.id)
    })

    return currenciesToDisplay;
  }

  openDeleteDialog(account) {
    this.selectedAccountTransferFrom = account;
    this.balanceToTransfer = this.selectedAccountTransferFrom.accountBalance;
    this.AccountsToTransferTo = this.Accounts.filter((e) => {
      return e.id != this.selectedAccountTransferFrom.id
    })
    this.selectedAccountToTransferTo = this.AccountsToTransferTo[0];

    if (account.accountBalance > 0) {
      this.displayDeleteDialog = true;
    } else {
      this.deleteAccount(account);
    }
  }

  closeDeleteAccountDialog() {
    this.selectedAccountTransferFrom = null;
    this.displayTransferFunds = false;
    this.balanceToTransfer = 0;
  }

  deleteAccountWithFunds(account: any) {

    let params = {
      accountFrom: this.selectedAccountTransferFrom,
      accountTo: this.selectedAccountToTransferTo,
      balanceToTransfer: this.balanceToTransfer
    }

    this.accountService.transferFundsToAccount(params).subscribe((data) => {
      this.accountService.deleteAccount(account).subscribe(() => {
        this.accountService.getAllAccounts().subscribe((data) => {
          this.formatDates(data);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been deleted successfully' });
        });
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }, () => {
        this.selectedAccountTransferFrom = null;
        this.displayDeleteDialog = false;
        this.balanceToTransfer = 0;
      });
    })

  }

  openAccountHistory(account: any) {
    this.setActivityHistoryAccount = account.currency.code;

    this.accountService.getAccountHistory(account).subscribe((data) => {
      this.accountHistoryActivity = data;
      this.accountHistoryActivity.forEach(element => {
        element.activityChangeDate = element.activityChangeDate.split('T')[0];
      });
      this.displayAccountHistoryDialog = true;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  onChangeSetRatesToShow() {
    let Account;

    this.ExchangeRateService.getExchangeRateById(this.selectedAccountTransferFrom.currency.code).subscribe((data: []) => {
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

  openMakeTransferDialog() {
    this.displayMakeTransferDialog = true;
  }

  closeTransferFundsDialog() {
    this.displayMakeTransferDialog = false;
    this.selectedCurrencyToTransferTo = this.exchangeRates[0];
    this.balanceToTransfer = null;
  }

  transferFundsFromCard() {
    let params = {
      userId: 1,
      balanceToTransfer: this.balanceToTransfer,
      currencyCode: this.selectedCurrencyToTransferTo.code
    }
    this.accountService.makePayment(params).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment has been successfully made!' });
      this.selectedAccountToTransferTo = null;
      this.balanceToTransfer = null;
      this.displayMakeTransferDialog = false;
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No funds available!' });
      }
    }, () => { });
    
  }

  openAddToBalanceDialog() {
    this.displayAddToBalanceDialog = true;
    this.selectedAccountToTransferTo = this.Accounts[0];
  }

  closeAddToBalanceToDialog() {
    this.displayAddToBalanceDialog = false;
    this.selectedAccountToTransferTo = null;
    this.balanceToTransfer = null;
  }

  addToBalance() {
    let params = {
      accountTo: this.selectedAccountToTransferTo,
      balanceToTransfer: this.balanceToTransfer,
      accountFrom: null
    }

    this.accountService.addToBalance(params).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Funds have been transferes successfully!' });
      this.selectedAccountToTransferTo = null;
      this.balanceToTransfer = null;
      this.displayAddToBalanceDialog = false;
      this.accountService.getAllAccounts().subscribe((data) => {
        this.formatDates(data);

      },(err: HttpErrorResponse) => {
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
