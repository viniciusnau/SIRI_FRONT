import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  apiUrl = `${environment.apiUrl}/stock/suppliers`;
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

  public getSuppliers(pageChange = ''): Observable<any> {
    return pageChange
      ? this.httpClient.get<any>(
          `${this.apiUrl}/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(this.apiUrl, this.httpOptions);
  }

  public getAllSuppliers(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getSupplierById(supplierId: number): Observable<any> {
    const url = `${this.apiUrl}/${supplierId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public updateSupplier(supplierId: number, updateData: any): Observable<any> {
    const url = `${this.apiUrl}/${supplierId}`;
    return this.httpClient.patch<any>(url, updateData, this.httpOptions);
  }
}
