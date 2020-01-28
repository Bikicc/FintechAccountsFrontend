import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'FintechAccountsFrontend';
  displayAddNewAcc: boolean = false;

  constructor(private router: Router) {}

  routeAccounts() {
    this.router.navigate(["/Accounts"]);
  }

  routeDeactivatedAccounts() {
    this.router.navigate(["/DeactivatedAccounts"]);

  }

  routeExchangeRates() {
    this.router.navigate(["/ExchangeRates"]);

  }


}


