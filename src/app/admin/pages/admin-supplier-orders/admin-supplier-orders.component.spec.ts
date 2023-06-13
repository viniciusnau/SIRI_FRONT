import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplierOrdersComponent } from './admin-supplier-orders.component';

describe('AdminSupplierOrdersComponent', () => {
  let component: AdminSupplierOrdersComponent;
  let fixture: ComponentFixture<AdminSupplierOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSupplierOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSupplierOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
