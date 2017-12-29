import { UrlInterceptor, CamelCaseInterceptor } from './interceptors';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

import * as utils from './utils';

const url = '123';
let interceptor;
let httpRequest: HttpRequest<any>;

describe('Interceptors (Unit test)', () => {
  describe('#UrlInterceptor', () => {
    beforeEach(() => {
      interceptor = new UrlInterceptor();
      httpRequest = new HttpRequest('GET', url);
    });

    it ('should create', () => {
      expect(interceptor).toBeTruthy();
    });

    it ('should concatenate apiUrl to the httpRequest.url', () => {
      const httpHandler = { handle: req => req };

      const result = interceptor.intercept(httpRequest, httpHandler);

      expect(result.url).toBe(environment.apiUrl + url);
    });
  });

  describe('#CamelCaseInterceptor', () => {
    beforeEach(() => {
      interceptor = new CamelCaseInterceptor();

      spyOn(utils, 'snakeCase').and.callFake((s) => {
        switch (s) {
          case 'helloWorld':
          case 'hello_world':
          case 'Hello world':
            return 'hello_world';
          default:
            return s;
        }
      });
      spyOn(utils, 'camelCase').and.callFake((s) => {
        switch (s) {
          case 'helloWorld':
          case 'hello_world':
          case 'Hello world':
            return 'helloWorld';
          default:
            return s;
        }
      });
    });

    it ('should create', () => {
      expect(interceptor).toBeTruthy();
      httpRequest = new HttpRequest('GET', url);
    });

    it ('should not change url', () => {
      const uri = 'hello_world/helloWorld';
      const httpHandler = { handle: req => Observable.of(req) };
      httpRequest = new HttpRequest('GET', uri);

      const result = interceptor.intercept(httpRequest, httpHandler);

      result.subscribe(res => expect(res.url).toBe(uri));
    });

    it ('should change body properties to snake_case', () => {
      const httpHandler = { handle: req => Observable.of(req.body) };
      httpRequest = new HttpRequest('POST', url, { helloWorld: 1 });

      const result = interceptor.intercept(httpRequest, httpHandler);

      result.subscribe(res => expect(res).toEqual({ hello_world: 1 }));
    });

    it ('should not change body property values to snake_case', () => {
      const httpHandler = { handle: req => Observable.of(req.body) };
      httpRequest = new HttpRequest('POST', url, { 1: 'helloWorld', 2: 'hello_world', 3: 'hello world' });

      const result = interceptor.intercept(httpRequest, httpHandler);

      result.subscribe(res => expect(res).toEqual({ 1: 'helloWorld', 2: 'hello_world', 3: 'hello world' }));
    });
  });
});
