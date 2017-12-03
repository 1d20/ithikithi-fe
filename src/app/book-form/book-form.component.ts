import { Component, OnInit } from '@angular/core';
import { Booking } from '../_models/booking';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.less']
})
export class BookFormComponent implements OnInit {
  model: Booking;

  get minDate() {
    return this.model.transformDateToNgbStruct(new Date(+this.model.now - 1000 * 60 * 60 * 24));
  }

  get maxDate() {
    return this.model.transformDateToNgbStruct(new Date(+this.model.now + 1000 * 60 * 60 * 24 * 60));
  }

  constructor() { }

  ngOnInit() {
    this.model = new Booking();
  }

}
