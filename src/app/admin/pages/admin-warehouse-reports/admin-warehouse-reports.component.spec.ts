import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWarehouseReportsComponent } from './admin-warehouse-reports.component';

describe('AdminWarehouseReportsComponent', () => {
  let component: AdminWarehouseReportsComponent;
  let fixture: ComponentFixture<AdminWarehouseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWarehouseReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWarehouseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
