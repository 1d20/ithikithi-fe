import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TrainsResponse, TrainType } from '../../../$models/train';

interface TableRow {
  number: string;
  station: { from: string; till: string; };
  date: { from: Date; till: Date; };
  duration: string;
  freeSpace: TrainType[];
}

@Component({
  selector: 'app-trains-table',
  templateUrl: './trains-table.component.html',
  styleUrls: ['./trains-table.component.less'],
})
export class TrainsTableComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  private trains;

  private rows: TableRow[] = [];

  private columns = [
    { title: '#', name: 'number' },
    { title: 'From / To', name: 'fromTo' },
    { title: 'Date', name: 'date' },
    { title: 'Departure / Arrival', name: 'departureArrival' },
    { title: 'Duration', name: 'duration' },
    { title: 'Free space', name: 'freeSpace' },
  ];

  private transformTrainsToRows(trains: TrainsResponse): TableRow[] {
    return trains.map(train => ({
      number: train.num,
      station: { from: train.from.station, till: train.till.station },
      date: { from: new Date(train.from.date * 1000), till: new Date(train.till.date * 1000) },
      duration: train.travel_time,
      freeSpace: train.types,
    }));
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.trains) {
      this.rows = this.transformTrainsToRows(changes.trains.currentValue);
    }
  }

}
