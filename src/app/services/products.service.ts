import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env.environment';

export interface GetProductDto {
  categories: number[];
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  apiUrl = `${environment.apiUrl}/stock/products`;
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

  public getProducts(
    getProductDto: GetProductDto,
    pageChange = '',
  ): Observable<any> {
    if (getProductDto.categories.length !== 0) {
      const options = {
        headers: this.httpOptions.headers,
        params: new HttpParams().set(
          'category_id',
          getProductDto.categories.join(','),
        ),
      };
      return this.httpClient.get<any>(
        `${this.apiUrl}${pageChange ? `/?page=${pageChange}` : ''}`,
        options,
      );
    } else {
      return this.httpClient.get<any>(
        `${this.apiUrl}${pageChange ? `/?page=${pageChange}` : ''}`,
        this.httpOptions,
      );
    }
  }

  public getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public searchProducts(product: string, pageChange = '',): Observable<any> {
    const url = `${this.apiUrl}/search/${pageChange ? `?page=${pageChange}` : ''}&product=${product}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
