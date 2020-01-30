import { getTokenService } from './Services/getTokenService';
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

  constructor(private router: Router, private GetTokenService: getTokenService) { }

  ngOnInit(): void {
    //   const headers = {
    //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'grant_type':'password',
    //   'username':'user',
    //   'password':'pass',
    //   'client_id':'client',
    //   'client_secret':'secret'
    // }

    // let header = new Headers(headers);

    // this.GetTokenService.getToken().subscribe((data) => {
    //     console.log(data)
    //   });
    // }
  }

  routeAccounts() {
    this.router.navigate(["/Accounts"]);
  }

  routeDeactivatedAccounts() {
    this.router.navigate(["/DeactivatedAccounts"]);

  }

  routeExchangeRates() {
    this.router.navigate(["/ExchangeRates"]);

  }

  routeAutomaticTransactions() {
    this.router.navigate(["/AutomaticTransactions"])
  }


}


