import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private stockId: number;

  setStockId(id: number) {
    this.stockId = id;
  }

  getStockId(): number {
    return this.stockId;
  }
}
