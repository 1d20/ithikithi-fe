import { SearchFormData } from './search-form';

describe('SearchFormData', () => {
  let model;

  beforeEach(() => {
    model = new SearchFormData();
  });

  it ('should create', () => {
    expect(model).toBeTruthy();
  });

  it ('should init date and time', () => {
    expect(model.date).toBeTruthy();
    expect(model.time).toBeTruthy();
  });

  it ('should set current date to "now" property', () => {
    const before = Date.now();
    model = new SearchFormData();
    const after = Date.now();

    expect(model.now.valueOf()).toBeGreaterThanOrEqual(before);
    expect(model.now.valueOf()).toBeLessThanOrEqual(after);
  });

  it ('should replace "from" and "to" properties', () => {
    const from  = model.from = 'from';
    const to = model.to = 'to';

    model.replace();

    expect(model.from).toBe(to);
    expect(model.to).toBe(from);
  });

  it ('should transform Date to NgbDateStruct', () => {
    const date = new Date(1995, 3, 12, 10, 3, 30, 14);

    const dateStruct = model.transformDateToNgbStruct(date);

    expect(dateStruct).toEqual({ year: 1995, month: 4, day: 12 });
  });
});
