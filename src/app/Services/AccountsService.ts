import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class AccountsService {

    apiConfigUrl: String = 'http://localhost:4000/';

    constructor(public http: HttpClient) { }

    getAllAccounts() {
        return this.http.get(this.apiConfigUrl + "activeAccounts")
    }

    deleteAccount(account) {
        return this.http.get(this.apiConfigUrl + "deleteAccount/" + account.id)
    }

    getAllDeactivatedAccounts() {
        return this.http.get(this.apiConfigUrl + "deletedAccounts")
    }

    activateAccount(account) {
        return this.http.get(this.apiConfigUrl + "activateAccount/" + account.id)

    }

    getAccTypes() {
        return this.http.get(this.apiConfigUrl + "AccountTypes")
    }

    gettAllCurrencies() {
        return this.http.get(this.apiConfigUrl + "getCurrencyList")
    }

    addNewAccount(params) {
        return this.http.post(this.apiConfigUrl + 'insertNewAccount', params)
    }
}
