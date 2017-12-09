import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import trains from '../../$json/trains.json';
import { SearchFormData } from '../../$models/search-form';
import { TrainsResponse } from '../../$models/train';

@Injectable()
export class UzService {

  constructor(private http: HttpClient) { }

  public searchTrains(data: SearchFormData): Observable<TrainsResponse> {
    // return this.http.get('')
    return Observable.of(trains).delay(100);
  }
}
