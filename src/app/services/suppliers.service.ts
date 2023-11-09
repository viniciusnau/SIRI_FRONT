import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  apiUrl = `${environment.apiUrl}/stock/suppliers`;
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
