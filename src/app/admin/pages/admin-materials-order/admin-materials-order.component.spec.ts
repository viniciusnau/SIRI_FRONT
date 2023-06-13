import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaterialsOrderComponent } from './admin-materials-order.component';

describe('AdminMaterialsOrderComponent', () => {
  let component: AdminMaterialsOrderComponent;
  let fixture: ComponentFixture<AdminMaterialsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMaterialsOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMaterialsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
