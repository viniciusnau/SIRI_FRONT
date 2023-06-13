import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideResetPasswordComponent } from './inside-reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: InsideResetPasswordComponent;
  let fixture: ComponentFixture<InsideResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideResetPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsideResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
