import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'Bearer 732eb2a9-15ed-414c-baf5-7894a6063b42'

    const req1 = req.clone({
      setHeaders: {
        Authorization: token
      }
    })
     return next.handle(req1);
  }

}