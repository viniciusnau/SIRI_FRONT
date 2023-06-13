import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockReportsComponent } from './admin-stock-reports.component';

describe('AdminStockReportsComponent', () => {
  let component: AdminStockReportsComponent;
  let fixture: ComponentFixture<AdminStockReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStockReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
