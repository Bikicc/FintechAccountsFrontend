import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class AutomaticTransactionsService { 

    apiConfigUrl: String = 'http://localhost:4000/';

    constructor(public http: HttpClient) { }

    getAllAutomaticTransactions() {
        return this.http.get(this.apiConfigUrl + "automaticActions")
    }

    inserNewAutomaticTransactions(params) {
        return this.http.post(this.apiConfigUrl + "insertNewAutomaticAction", params)
    }

    deleteAutomaticTransactions(id) {
        return this.http.get(this.apiConfigUrl + "deleteAutomaticAction/" + id)
    }

    getDestinationAccount(id) {
        return this.http.get(this.apiConfigUrl + "getAccountById/" + id)
    }

    checkAutomaticActions() {
        return this.http.get(this.apiConfigUrl + "fillerText/checkAutomaticActions")
    }

}