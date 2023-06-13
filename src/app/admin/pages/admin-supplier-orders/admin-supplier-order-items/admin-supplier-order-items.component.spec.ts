import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplierOrderItemsComponent } from './admin-supplier-order-items.component';

describe('AdminSupplierOrderItemsComponent', () => {
  let component: AdminSupplierOrderItemsComponent;
  let fixture: ComponentFixture<AdminSupplierOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupplierOrderItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSupplierOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
