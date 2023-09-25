import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingReportsComponent } from './receiving-reports.component';

describe('ReceivingReportsComponent', () => {
  let component: ReceivingReportsComponent;
  let fixture: ComponentFixture<ReceivingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivingReportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
