import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingExemption } from './bidding-exemption.component';

describe('BiddingExemption', () => {
  let component: BiddingExemption;
  let fixture: ComponentFixture<BiddingExemption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingExemption],
    }).compileComponents();

    fixture = TestBed.createComponent(BiddingExemption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
