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
}
