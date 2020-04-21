import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCardsComponent } from './schedule-cards.component';

describe('ScheduleCardsComponent', () => {
  let component: ScheduleCardsComponent;
  let fixture: ComponentFixture<ScheduleCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
