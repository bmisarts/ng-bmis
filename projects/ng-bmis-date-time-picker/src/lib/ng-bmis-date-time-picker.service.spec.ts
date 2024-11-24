import { TestBed } from '@angular/core/testing';

import { NgBmisDateTimePickerService } from './ng-bmis-date-time-picker.service';

describe('NgBmisDateTimePickerService', () => {
  let service: NgBmisDateTimePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgBmisDateTimePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
