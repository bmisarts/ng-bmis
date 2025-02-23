import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBmisDateTimePickerComponent } from './ng-bmis-date-time-picker.component';

describe('NgBmisDateTimePickerComponent', () => {
  let component: NgBmisDateTimePickerComponent;
  let fixture: ComponentFixture<NgBmisDateTimePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgBmisDateTimePickerComponent]
    });
    fixture = TestBed.createComponent(NgBmisDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
