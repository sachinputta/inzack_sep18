import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjourneyPage } from './viewjourney.page';

describe('ViewjourneyPage', () => {
  let component: ViewjourneyPage;
  let fixture: ComponentFixture<ViewjourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjourneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
