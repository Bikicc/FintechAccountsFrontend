import { DeactivatedAccountsComponent } from './deactivated-accounts/deactivated-accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  { path: '' , redirectTo: 'Accounts', pathMatch: 'full' },
  { path:'Accounts', component: AccountsComponent },
  { path:'DeactivatedAccounts', component: DeactivatedAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
