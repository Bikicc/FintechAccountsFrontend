import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class getTokenService {

    apiConfigUrl: String = 'http://localhost:4000/';

    constructor(public http: HttpClient) { }

    // getToken(Authorization) {
    //     return this.http.get(this.apiConfigUrl + "oauth/" + "token", Authorization);
    // }
}
