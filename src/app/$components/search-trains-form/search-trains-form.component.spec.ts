import { SearchTrainsFormComponent } from './search-trains-form.component';
import { MockedSearchFormData } from '../../../test/mocked-search-form';

describe('SearchTrainsFormComponent', () => {
  let component: SearchTrainsFormComponent;

  beforeEach(() => {
    component = new SearchTrainsFormComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Date getters', () => {
    beforeEach(() => {
      spyOn(component, 'ngOnInit').and.callFake(function () {
        this.model = new MockedSearchFormData();
      });
      component.ngOnInit();
    });

    it ('should get today from minDate', () => {
      expect(component.minDate).toEqual({ year: 2000, month: 4, day: 29 });
    });

    it ('should get n days after from maxDate', () => {
      (<any>component).maxDays = 3;
      expect(component.maxDate).toEqual({ year: 2000, month: 5, day: 2 });
    });
  });
});
