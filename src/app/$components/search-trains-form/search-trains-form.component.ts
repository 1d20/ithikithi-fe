import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchFormData } from '../../$models/search-form';

@Component({
  selector: 'app-search-trains-form',
  templateUrl: './search-trains-form.component.html',
  styleUrls: ['./search-trains-form.component.less']
})
export class SearchTrainsFormComponent implements OnInit {
  private model: SearchFormData;

  get minDate() {
    return this.model.transformDateToNgbStruct(new Date(+this.model.now - 1000 * 60 * 60 * 24));
  }

  get maxDate() {
    return this.model.transformDateToNgbStruct(new Date(+this.model.now + 1000 * 60 * 60 * 24 * 60));
  }

  constructor() { }

  ngOnInit() {
    this.model = new SearchFormData();
  }
}
