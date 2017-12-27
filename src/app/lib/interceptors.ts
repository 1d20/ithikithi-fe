import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { snakeCase } from './utils';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ url: environment.apiUrl + req.url }));
  }
}

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      body: transformObject(req.body, snakeCase),
      params: transformParams(req.params, snakeCase),
      headers: transformHeaders(req.headers, snakeCase),
    });

    return next.handle(newReq).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
      return event;
    });
  }
}

function transformObject(object: object, transformFunc: (value: string) => string): {[name: string]: string}  {
  const newObject = {};

  for (const key in object) {
    if (object[key]) {
      console.log('transformFunc(key)', transformFunc(key));
      newObject[transformFunc(key)] = object[key];
    }
  }

  return newObject;
}

function extractObjectFromMap(map) {
  const obj = {};

  for (const key of map.keys()) {
    obj[key] = map.get(key);
  }

  return obj;
}

function transformParams(params, transformFunc: (value: string) => string): HttpParams {
  return new HttpParams({ fromObject: transformObject(extractObjectFromMap(params), transformFunc) });
}

function transformHeaders(headers: HttpHeaders, transformFunc: (value: string) => string): HttpHeaders {
  return new HttpHeaders(transformObject(extractObjectFromMap(headers), transformFunc));
}
