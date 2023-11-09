import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class StocksService {
  apiUrl = `${environment.apiUrl}/stock`;
  httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const storedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    let headers = new HttpHeaders();

    if (storedAuth) {
      const [username, password] = storedAuth.split(':');
      headers = headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    } else {
      const apiToken = sessionStorage.getItem('apiToken');
      if (apiToken) {
        headers = headers.set('Authorization', 'Token ' + apiToken);
      }
    }

    this.httpOptions = {
      headers: headers,
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

  public getAllStocks(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/all-stocks/`,
      this.httpOptions,
    );
  }

  public getStockItems(stock_id: string, pageChange = ''): Observable<any> {
    const options = {
      headers: this.httpOptions.headers,
      params: new HttpParams().set('stock_id', stock_id),
    };
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/stock-items/?page=${pageChange}`,
          options,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/stock-items`, options);
  }

  public getStockItem(stock_item = ''): Observable<any> {
    const options = {
      headers: this.httpOptions.headers
    };
    return stock_item
      ? this.httpClient.get<any>(
        `${this.apiUrl}/stock-items/${stock_item}`,
        options,
      )
      : this.httpClient.get<any>(`${this.apiUrl}/stock-items/${stock_item}`, options);
  }

  public getSectors(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/sectors/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/sectors`, this.httpOptions);
  }

  public getCategories(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/categories/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/categories`, this.httpOptions);
  }

  public getMeasures(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/measures/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/measures`, this.httpOptions);
  }

  public getProducts(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/products/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/products`, this.httpOptions);
  }

  public getAllSectors(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/sectors/all/`,
      this.httpOptions,
    );
  }

  public getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/categories/all/`,
      this.httpOptions,
    );
  }

  public getAllMeasures(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/measures/all/`,
      this.httpOptions,
    );
  }

  public getAllProducts(protocolId = null): Observable<any> {
    if (protocolId) {
      return this.httpClient.get<any>(
        `${this.apiUrl}/products/all/?protocol_id=${protocolId}`,
        this.httpOptions,
      );
    }
    return this.httpClient.get<any>(
      `${this.apiUrl}/products/all/`,
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

  public getDispatchReports(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/dispatch-reports/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(
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

  public getAllInvoices(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/invoices/all/`,
      this.httpOptions,
    );
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

  public getAllProtocols(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/protocols/all/`,
      this.httpOptions,
    );
  }

  public getAllPublicDefenses(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/public-defenses/all/`,
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

  public getBiddingExemption(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/bidding-exemption/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(
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

    return this.httpClient.post(`${this.apiUrl}/email/`, payload, this.httpOptions);
  }

  getWarehouseReports(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/warehouse-items/`,
      this.httpOptions,
    );
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

  getProtocolItems(protocol: string, pageChange = '') {
    const url = this.apiUrl + `/protocol-items/?protocol_id=${protocol}`;
    return pageChange
      ? this.httpClient.get<any>(`${url}&&page=${pageChange}`, this.httpOptions)
      : this.httpClient.get<any>(url, this.httpOptions);
  }

  getAllProtocolItems(protocol: string) {
    const url = this.apiUrl + `/protocol-items/all/?protocol_id=${protocol}`;
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
