import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockItemsComponent } from './admin-stock-items.component';

describe('AdminStockItemsComponent', () => {
  let component: AdminStockItemsComponent;
  let fixture: ComponentFixture<AdminStockItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStockItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
