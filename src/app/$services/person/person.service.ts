import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonResponse } from '../../$models/person';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get<PersonResponse>('person/person');
  }
}
