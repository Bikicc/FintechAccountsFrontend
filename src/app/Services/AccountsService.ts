import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class AccountsService {

    apiConfigUrl: String = 'http://localhost:4000/';


    constructor(public http: HttpClient) {
    }


    getAllAccounts() {
        return this.http.get(this.apiConfigUrl + "activeAccounts")
    }

    deleteAccount(account) {
        return this.http.delete(this.apiConfigUrl + "deleteAccount/" + account.id)
    }

    getAllDeactivatedAccounts() {
        return this.http.get(this.apiConfigUrl + "deactivatedAccounts")
    }

    activateAccount(account) {
        return this.http.put(this.apiConfigUrl + "activateAccount/" + account.id, {})

    }

    gettAllCurrencies() {
        return this.http.get(this.apiConfigUrl + "getCurrencyList")
    }

    addNewAccount(params) {
        return this.http.post(this.apiConfigUrl + 'insertNewAccount', params)
    }

    transferFundsToAccount(params) {
        return this.http.post(this.apiConfigUrl + 'addToAccountBalance', params)
    }

    getAccountHistory(account) {
        return this.http.get(this.apiConfigUrl + "AccountActivityHistory/" + account.id)
    }

    makePayment(params) {
        return this.http.post(this.apiConfigUrl + "removeBalance" , params) 
    }

    addToBalance(params) {
        return this.http.post(this.apiConfigUrl + "addToAccountBalance" , params) 
    }
}
