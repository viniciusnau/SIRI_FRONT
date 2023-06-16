import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  apiUrl = `${environment.apiUrl}/order`;
  httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const storedAuth =
      localStorage.getItem('auth') || sessionStorage.getItem('auth');
    const [username, password] = storedAuth
      ? storedAuth.split(':')
      : [null, null];

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
  }

  public getAllOrders(pageChange = ''): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + pageChange, this.httpOptions);
  }

  public getOrderItems(order_id: string): Observable<any> {
    const options = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('order_id', order_id),
    };
    return this.httpClient.get<any>(`${this.apiUrl}/order-items`, options);
  }

  public deleteOrderItem(order_item_id: string, description?: string): any {
    let url = `${this.apiUrl}/order-items/${order_item_id}`;
    if (description) {
      url += `/?description=${encodeURIComponent(description)}`;
    }
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  public deleteOrder(order_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/${order_id}`,
      this.httpOptions,
    );
  }

  public getSupplierOrdersById(supplier_id: string): Observable<any> {
    const options = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('supplier_id', supplier_id),
    };
    return this.httpClient.get<any>(`${this.apiUrl}/supplier-orders`, options);
  }

  public getSupplierOrders(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/supplier-orders`,
      this.httpOptions,
    );
  }

  public getSupplierOrderItems(supplier_order_id: string): Observable<any> {
    const options = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('supplier_order_id', supplier_order_id),
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/supplier-order-items`,
      options,
    );
  }

  public getMaterialsOrder(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/materials-order`,
      this.httpOptions,
    );
  }

  public deleteMaterialOrder(order_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/materials-order/${order_id}`,
      this.httpOptions,
    );
  }

  public getStockEntries(stock_item_id): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/stock-entries/?stock_item_id=${stock_item_id}`,
      this.httpOptions,
    );
  }

  public getStockWithdrawals(stock_item_id): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/stock-withdrawals/?stock_item_id=${stock_item_id}`,
      this.httpOptions,
    );
  }

  public getMaterialsOrderStatusCode(
    supplier_id,
    category_id,
    initial_date,
    final_date,
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/supplier-order-items/?supplier_id=${supplier_id}&initial_date=${initial_date}&final_date=${final_date}&category_id=${category_id}`,
      this.httpOptions,
    );
  }

  editSupplierOrder(order_id, body): any {
    const url = this.apiUrl + `/supplier-orders/${order_id}/`;

    return this.httpClient.patch<any>(url, body, this.httpOptions);
  }

  createSupplierOrder(body): any {
    const url = this.apiUrl + `/supplier-orders/`;

    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  createSupplierOrderItem(body): any {
    const url = this.apiUrl + `/supplier-order-items/`;

    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  public deleteGeneralOrderItem(order_item_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/supplier-order-items/${order_item_id}`,
      this.httpOptions,
    );
  }

  public deleteWithdraw(withdraw_item_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/stock-withdrawals/${withdraw_item_id}`,
      this.httpOptions,
    );
  }

  public deleteGeneralSupplierOrder(order_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/supplier-orders/${order_id}`,
      this.httpOptions,
    );
  }

  patchMaterialsOrder(objectId: number, formData: FormData) {
    const url = `${this.apiUrl}/materials-order/${objectId}/`;
    return this.httpClient.patch(url, formData, this.httpOptions);
  }

  updateOrder(orderId: number, payload: any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/`;
    return this.httpClient.patch(url, payload, this.httpOptions);
  }

  public updateOrderItem(itemId: number, updateData: any): Observable<any> {
    const url = `${this.apiUrl}/order-items/${itemId}/`;
    return this.httpClient.patch<any>(url, updateData, this.httpOptions);
  }

  createOrder(order: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/`,
      order,
      this.httpOptions,
    );
  }

  createOrderItems(orderItems: any[]): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/order-items/`,
      orderItems,
      this.httpOptions,
    );
  }

  createStockWithdrawal(body): any {
    const url = this.apiUrl + `/stock-withdrawals/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }
}
