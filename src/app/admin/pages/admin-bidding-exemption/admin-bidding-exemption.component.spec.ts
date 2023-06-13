import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBiddingExemptionComponent } from './admin-bidding-exemption.component';

describe('AdminBiddingExemptionComponent', () => {
  let component: AdminBiddingExemptionComponent;
  let fixture: ComponentFixture<AdminBiddingExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBiddingExemptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBiddingExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
