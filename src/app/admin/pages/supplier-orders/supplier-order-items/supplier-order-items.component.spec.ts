import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderItemsComponent } from './supplier-order-items.component';

describe('SupplierOrderItemsComponent', () => {
  let component: SupplierOrderItemsComponent;
  let fixture: ComponentFixture<SupplierOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierOrderItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
