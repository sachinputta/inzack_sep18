import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewisejourneyComponent } from './datewisejourney.component';

describe('DatewisejourneyComponent', () => {
  let component: DatewisejourneyComponent;
  let fixture: ComponentFixture<DatewisejourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatewisejourneyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatewisejourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
