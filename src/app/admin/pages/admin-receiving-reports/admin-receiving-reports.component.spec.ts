import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceivingReportsComponent } from './admin-receiving-reports.component';

describe('AdminReceivingReportsComponent', () => {
  let component: AdminReceivingReportsComponent;
  let fixture: ComponentFixture<AdminReceivingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReceivingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReceivingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
