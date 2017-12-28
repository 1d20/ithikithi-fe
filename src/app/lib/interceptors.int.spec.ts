import { getTestBed, TestBed } from '@angular/core/testing';
import { UrlInterceptor, CamelCaseInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

import * as utils from './utils';

const url = '123';
const object = { 1: 'helloWorld', 2: 'hello_world', 3: 'Hello world' };

describe('Interceptors (Integration tests)', () => {
  let injector;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  afterEach(() => {
    httpMock.verify();
  });

  describe('#UrlInterceptor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlInterceptor,
            multi: true,
          },
        ],
      });

      injector = getTestBed();
      http = injector.get(HttpClient);
      httpMock = injector.get(HttpTestingController);
    });

    it ('should concatenate apiUrl to the httpRequest.url', () => {
      const expectedUrl = environment.apiUrl + url;
      http.get(url).subscribe(response => expect(response).toBeTruthy());

      const request = httpMock.expectOne(expectedUrl, `Url should match "${expectedUrl}"`);
      request.flush({data: 'test'});
    });
  });

  describe('#CamelCaseInterceptor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: CamelCaseInterceptor,
            multi: true,
          },
        ],
      });

      injector = getTestBed();
      http = injector.get(HttpClient);
      httpMock = injector.get(HttpTestingController);

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

    it ('should not change url', () => {
      const testUrl = 'snake_url/camelCaseUrl';
      http.get(testUrl).subscribe(response => expect(response).toBeTruthy());

      const request = httpMock.expectOne(testUrl, `Url should match "${testUrl}"`);
      request.flush({ data: 'test' });
    });

    it ('should change body properties to snake_case', () => {
      http.post(url, { helloWorld: 1 }).subscribe();

      httpMock.expectOne(req => {
        expect(req.body).toEqual({ hello_world: 1 });
        return true;
      });
    });

    it ('should not change body property values to snake_case', () => {
      http.post(url, object).subscribe();

      httpMock.expectOne(req => {
        expect(req.body).toEqual(object);
        return true;
      });
    });

    it ('should deep change body properties to snake_case', () => {
      http.post(url, { helloWorld: { helloWorld: 1 } }).subscribe();

      httpMock.expectOne(req => {
        expect(req.body).toEqual({ hello_world: { hello_world: 1 } });
        return true;
      });
    });

    it ('should change params properties to snake_case', () => {
      http.get(url, { params: { helloWorld: '1' } }).subscribe();

      httpMock.expectOne(req => {
        expect(req.params.keys()).toEqual(['hello_world']);
        return true;
      });
    });

    it ('should not change params property values to snake_case', () => {
      http.get(url, { params: { 1: 'helloWorld', 2: 'hello_world', 3: 'Hello world' }}).subscribe();

      httpMock.expectOne(req => {
        expect(req.params.get('1')).toBe('helloWorld');
        expect(req.params.get('2')).toBe('hello_world');
        expect(req.params.get('3')).toBe('Hello world');
        return true;
      });
    });

    it ('should change response properties to camel case', () => {
      http.get(url).subscribe(response => {
        expect(response).toEqual({ helloWorld: 1 });
      });

      const req = httpMock.expectOne(url);
      req.flush({ hello_world: 1 });
    });

    it ('should deep change response properties to camel case', () => {
      http.get(url).subscribe(response => {
        expect(response).toEqual({ helloWorld: { helloWorld: 1 } });
      });

      const req = httpMock.expectOne(url);
      req.flush({ hello_world: { hello_world: 1 } });
    });

    it ('should not change response property values to camel case', () => {
      http.get(url).subscribe(response => expect(response).toEqual(object));

      const req = httpMock.expectOne(url);
      req.flush(object);
    });

    it ('should change response properties to camel case if observe === "response"', () => {
      http.get(url, { observe: 'response' }).subscribe(response => {
        expect(response.body).toEqual({ helloWorld: 1 });
      });

      const req = httpMock.expectOne(url);
      req.flush({ hello_world: 1 });
    });

    it ('should not change response property values to camel case if observe === "response"', () => {
      http.get(url, { observe: 'response' }).subscribe(response => expect(response.body).toEqual(object));

      const req = httpMock.expectOne(url);
      req.flush(object);
    });
  });
});
