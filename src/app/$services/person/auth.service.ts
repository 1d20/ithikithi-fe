import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserRequest } from '../../$models/person';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getBookings() {
    this.http.get<any>('booking/booking/', {
      withCredentials: true,
    }).subscribe(console.log);
  }

  signUp(body: UserRequest) {
    return this.http.post('person/authenticate/signup/', body).subscribe(res => console.log(res));

  }

  login(body: UserRequest) {
    return this.http.post('person/authenticate/login/', body, { observe: 'response', withCredentials: true });
  }
}

