import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createOrderComponent } from './createOrder.component';

describe('HomeComponent', () => {
  let component: createOrderComponent;
  let fixture: ComponentFixture<createOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [createOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(createOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
