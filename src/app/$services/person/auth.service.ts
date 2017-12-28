import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../../$models/person';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(body: UserRequest) {
    return this.http.post('person/authenticate/signup/', body, {
      params: { helloMan: '1' }
    }).subscribe(res => console.log(res));

  }

  login(body: UserRequest) {
    return this.http.post('person/authenticate/login/', body, { observe: 'response', withCredentials: true });
  }
}

