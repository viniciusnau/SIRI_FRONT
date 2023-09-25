import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialsOrderModalComponent } from './create-materials-order-modal.component';

describe('CreateMaterialsOrderModalComponent', () => {
  let component: CreateMaterialsOrderModalComponent;
  let fixture: ComponentFixture<CreateMaterialsOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMaterialsOrderModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMaterialsOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
