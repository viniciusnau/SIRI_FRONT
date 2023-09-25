import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialsConfirmOrderModalComponent } from './create-materials-order-modal.component';

describe('CreateMaterialsConfirmOrderModalComponent', () => {
  let component: CreateMaterialsConfirmOrderModalComponent;
  let fixture: ComponentFixture<CreateMaterialsConfirmOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMaterialsConfirmOrderModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CreateMaterialsConfirmOrderModalComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
