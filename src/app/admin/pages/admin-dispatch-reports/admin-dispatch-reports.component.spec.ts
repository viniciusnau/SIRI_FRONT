import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDispatchReportsComponent } from './admin-dispatch-reports.component';

describe('AdminDispatchReportsComponent', () => {
  let component: AdminDispatchReportsComponent;
  let fixture: ComponentFixture<AdminDispatchReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDispatchReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDispatchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
