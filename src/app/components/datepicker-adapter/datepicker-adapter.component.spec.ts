import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerAdapterComponent } from './ngbd-datepicker-adapter.component';

describe('DatepickerAdapterComponent', () => {
  let component: DatepickerAdapterComponent;
  let fixture: ComponentFixture<DatepickerAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
