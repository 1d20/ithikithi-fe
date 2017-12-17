export class MockedSearchFormData {
  public now = new Date(2000, 3, 29, 0, 1, 0);
  public date;

  constructor() {
    this.date = this.transformDateToNgbStruct(this.now);
  }

  transformDateToNgbStruct(date) {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
}
