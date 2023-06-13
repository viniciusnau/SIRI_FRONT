import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountantReportsComponent } from './admin-accountant-reports.component';

describe('AdminAccountantReportsComponent', () => {
  let component: AdminAccountantReportsComponent;
  let fixture: ComponentFixture<AdminAccountantReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAccountantReportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAccountantReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
