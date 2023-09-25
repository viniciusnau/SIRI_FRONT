import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchReports } from './dispatch-reports.component';

describe('DispatchReports', () => {
  let component: DispatchReports;
  let fixture: ComponentFixture<DispatchReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DispatchReports],
    }).compileComponents();

    fixture = TestBed.createComponent(DispatchReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
