import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBySectorComponent } from './stock-by-sector.component';

describe('StockBySectorComponent', () => {
  let component: StockBySectorComponent;
  let fixture: ComponentFixture<StockBySectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockBySectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockBySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
