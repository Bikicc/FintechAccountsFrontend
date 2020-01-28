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
  selectedDate: Date = new Date();
  maxDate: Date = new Date();
  datePicked: boolean = false;

  constructor(private ExchangeRateService: exchangeRateService) { }

  ngOnInit() {
    this.ExchangeRateService.getExchangeRateById(this.defaultExchangeRate).subscribe((data) => {
      this.selectedExchangeRate = data;
      this.findSelectedExchangeRate = data[0].baseCurrency;
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

  // getRatesForDate() {
  //   let selectedDateArray = this.selectedDate.toLocaleDateString().split('/').reverse();
  //   let dateFormated = selectedDateArray[0] + '-' + selectedDateArray[2] + '-' + selectedDateArray[1];

  //   this.ExchangeRateService.getRatesForDate(dateFormated, this.findSelectedExchangeRate.code).subscribe((data) => {
  //     console.log(data)
  //   }, (err: HttpErrorResponse) => {
  //     if (err.error instanceof Error) {
  //       console.log('Client-side error occured.');
  //     } else {
  //       console.log('Server-side error occured.');
  //     }
  //   }, () => { });

  // }

}
