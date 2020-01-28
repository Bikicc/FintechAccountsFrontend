import { Component, OnInit } from '@angular/core';
import { exchangeRateService } from '../Services/exchangeRateService'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {

  defaultExchangeRate: String = "HRK";
  selectedExchangeRate: any;
  exchangeRates: any = []
  findSelectedExchangeRate: any;

  constructor(private ExchangeRateService: exchangeRateService) { }

  ngOnInit() {
    this.ExchangeRateService.getExchangeRateById(this.defaultExchangeRate).subscribe((data) => {
      this.selectedExchangeRate = data;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });

    this.ExchangeRateService.getAllExchangeRates().subscribe((data) => {
      this.exchangeRates = data;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

  onChangeGetExchangeRates() {
     this.ExchangeRateService.getExchangeRateById(this.findSelectedExchangeRate.code).subscribe((data) => {
      this.selectedExchangeRate = data;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Client-side error occured.');
      } else {
        console.log('Server-side error occured.');
      }
    }, () => { });
  }

}
