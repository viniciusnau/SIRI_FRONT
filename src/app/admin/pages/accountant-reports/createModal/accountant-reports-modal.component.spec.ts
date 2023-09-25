import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantReportsModalComponent } from './accountant-reports-modal.component';

describe('AccountantReportsModalComponent', () => {
  let component: AccountantReportsModalComponent;
  let fixture: ComponentFixture<AccountantReportsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountantReportsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountantReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
