import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBySectorItemsComponent } from './stock-by-sector-items.component';

describe('StockItemsComponent', () => {
  let component: StockBySectorItemsComponent;
  let fixture: ComponentFixture<StockBySectorItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockBySectorItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockBySectorItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
