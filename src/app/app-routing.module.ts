import { AutomaticTransactionsComponent } from './automatic-transactions/automatic-transactions.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { DeactivatedAccountsComponent } from './deactivated-accounts/deactivated-accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  { path: '' , redirectTo: 'Accounts', pathMatch: 'full' },
  { path:'Accounts', component: AccountsComponent },
  { path:'DeactivatedAccounts', component: DeactivatedAccountsComponent },
  { path: 'ExchangeRates', component: ExchangeRateComponent},
  { path: 'AutomaticTransactions', component: AutomaticTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
