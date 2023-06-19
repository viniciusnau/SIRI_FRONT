import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class StocksService {
  apiUrl = `${environment.apiUrl}/stock`;
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

  public getStocks(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(this.apiUrl, this.httpOptions);
  }

  public getStockItems(stock_id: string): Observable<any> {
    const options = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('stock_id', stock_id),
    };
    return this.httpClient.get<any>(`${this.apiUrl}/stock-items`, options);
  }

  public getAllSectors(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/sectors/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/sectors`, this.httpOptions);
  }

  public getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/categories`,
      this.httpOptions,
    );
  }

  public getAllMeasures(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/measures`,
      this.httpOptions,
    );
  }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/products`,
      this.httpOptions,
    );
  }

  public getReceivingReports(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/receiving-reports/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(
          `${this.apiUrl}/receiving-reports`,
          this.httpOptions,
        );
  }

  public getDispatchReports(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/dispatch-reports`,
      this.httpOptions,
    );
  }

  public deleteMeasure(measure_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/measures/${measure_id}`,
      this.httpOptions,
    );
  }

  public getInvoices(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/invoices/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/invoices`, this.httpOptions);
  }

  public deleteInvoice(invoice_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/invoices/${invoice_id}`,
      this.httpOptions,
    );
  }

  public postInvoice(body: FormData): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/invoices/`,
      body,
      this.httpOptions,
    );
  }

  public getProtocols(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/protocols`,
      this.httpOptions,
    );
  }

  public getPublicDefenses(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/publicdefenses`,
      this.httpOptions,
    );
  }

  public patchReceivingReport(id, body): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}/receiving-reports/${id}/`,
      body,
      this.httpOptions,
    );
  }

  public patchDispatchReport(id, body): any {
    return this.httpClient.patch<any>(
      `${this.apiUrl}/dispatch-reports/${id}/`,
      body,
      this.httpOptions,
    );
  }

  public postBiddingExemption(body): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/bidding-exemption/`,
      body,
      this.httpOptions,
    );
  }

  public getBiddingExemption(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/bidding-exemption`,
      this.httpOptions,
    );
  }

  public getAccountantReports(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/accountant-reports`,
      this.httpOptions,
    );
  }

  getAccountantReportsWithQueryString(date: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/accountant-reports/?date=` + date,
      this.httpOptions,
    );
  }

  sendEmail(subject: string, message: string): Observable<any> {
    const payload = {
      subject: subject,
      message: message,
    };

    return this.httpClient.post(`${this.apiUrl}/email/`, payload);
  }

  getWarehouseReports(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/warehouse-items/`);
  }

  getStockReports(queryString: string): Observable<any> {
    const url = this.apiUrl + `/stock-report/?${queryString}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  postAccountantReports(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/accountant-reports/`;
    return this.httpClient.post(url, formData, this.httpOptions);
  }

  deleteAccountantReport(id: number): Observable<any> {
    const url = `${this.apiUrl}/accountant-reports/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  editMeasure(measure_id, body): any {
    const url = this.apiUrl + `/measures/${measure_id}/`;

    return this.httpClient.patch<any>(url, body, this.httpOptions);
  }

  createMeasure(body): any {
    const url = this.apiUrl + `/measures/`;

    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  editCategory(category_id, body): any {
    const url = this.apiUrl + `/categories/${category_id}/`;

    return this.httpClient.patch<any>(url, body, this.httpOptions);
  }

  createCategory(body): any {
    const url = this.apiUrl + `/categories/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  public deleteCategory(category_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/categories/${category_id}/`,
      this.httpOptions,
    );
  }

  createSupplier(body): any {
    const url = this.apiUrl + `/suppliers/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  editSupplier(supplier_id, body): any {
    const url = this.apiUrl + `/suppliers/${supplier_id}/`;
    return this.httpClient.patch<any>(url, body, this.httpOptions);
  }

  editProduct(product_id, body): any {
    const url = this.apiUrl + `/products/${product_id}/`;

    return this.httpClient.patch<any>(url, body, this.httpOptions);
  }

  public deleteSupplier(supplier_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/suppliers/${supplier_id}/`,
      this.httpOptions,
    );
  }

  createProduct(body): any {
    const url = this.apiUrl + `/products/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  public deleteProduct(product_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/products/${product_id}/`,

      this.httpOptions,
    );
  }

  createBiddingExemption(body): any {
    const url = this.apiUrl + `/bidding-exemption/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  getProtocolItems(protocol: string) {
    const url = this.apiUrl + `/protocol-items/?protocol_id=${protocol}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  deleteBiddingExemption(biddingExemptionId: number): Observable<void> {
    const url = `${this.apiUrl}/biddings-exemption/${biddingExemptionId}/`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  updateReceivingReportFile(
    receivingReportId: number,
    file: any,
  ): Observable<any> {
    const url = `${this.apiUrl}/receiving-reports/${receivingReportId}/`;
    return this.httpClient.patch(url, file, this.httpOptions);
  }

  updateDispatchReportFile(
    dispatchReportId: number,
    file: any,
  ): Observable<any> {
    const url = `${this.apiUrl}/dispatch-reports/${dispatchReportId}/`;
    return this.httpClient.patch(url, file, this.httpOptions);
  }

  createProtocolItem(body): any {
    const url = this.apiUrl + `/protocol-items/`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  deleteProtocolItem(protocolItemId): Observable<void> {
    const url = `${this.apiUrl}/protocol-items/${protocolItemId}/`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}
