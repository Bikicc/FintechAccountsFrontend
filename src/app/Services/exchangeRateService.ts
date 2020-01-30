import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class exchangeRateService {

    apiConfigUrl: String = 'http://localhost:4000/';

    constructor(public http: HttpClient) { }

    getExchangeRateById(currency) {
        return this.http.get(this.apiConfigUrl + "getExchangeRate/" + currency)
    }

    getAllExchangeRates() {
        return this.http.get(this.apiConfigUrl + "getCurrencyList")
    }

    getRatesForDate(date: String, code: String) {
        return this.http.get(this.apiConfigUrl + "getExchangeRateByDate/" + code + "/" + date)
    }
 }