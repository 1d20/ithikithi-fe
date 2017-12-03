import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class SearchFormData {
  public date: NgbDateStruct;
  public time: NgbTimeStruct;
  public from: string;
  public to: string;

  public now: Date;

  replace() {
    const from = this.from;
    this.from = this.to;
    this.to = from;
  }

  transformDateToNgbStruct(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  constructor() {
    this.now = new Date();
    this.date = this.transformDateToNgbStruct(this.now);
    this.time = { hour: 0, minute: 0, second: 0 };
  }
}
