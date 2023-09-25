import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsOrderComponent } from './materials-order.component';

describe('MaterialsOrderComponent', () => {
  let component: MaterialsOrderComponent;
  let fixture: ComponentFixture<MaterialsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialsOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
