import { Component, OnInit } from '@angular/core';
import { SearchFormData } from '../../$models/search-form';
import { UzService } from '../../$services/booking/uz.service';
import { TrainsResponse } from '../../$models/train';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  providers: [UzService],
  styleUrls: ['./trains.component.less']
})
export class TrainsComponent implements OnInit {
  public loading: boolean;
  public trains: TrainsResponse = [];

  constructor(private uzService: UzService) {
  }

  ngOnInit() {
  }

  public searchTrains(data: SearchFormData) {
    this.loading = true;
    this.uzService.searchTrains(data).subscribe(
      trains => {
        console.log(trains);
        this.trains = trains;
      },
      err => {
        console.error(err);
      }, () => {
        this.loading = false;
      });
  }
}
