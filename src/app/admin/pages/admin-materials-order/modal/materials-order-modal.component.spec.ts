import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsOrderModalComponent } from './materials-order-modal.component';

describe('MaterialsOrderModalComponent', () => {
  let component: MaterialsOrderModalComponent;
  let fixture: ComponentFixture<MaterialsOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialsOrderModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
