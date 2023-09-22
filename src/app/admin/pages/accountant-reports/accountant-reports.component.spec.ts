import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantReports } from './accountant-reports.component';

describe('AccountantReports', () => {
  let component: AccountantReports;
  let fixture: ComponentFixture<AccountantReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountantReports],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountantReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
