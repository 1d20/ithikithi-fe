import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URI = 'http://192.168.0.103:8000/api/';
// const API_URI = 'http://18.216.38.56:8000/api/';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.clone({url: API_URI + req.url}))
    return next.handle(req.clone({url: API_URI + req.url}));
  }
}
