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
    const [username, password] = storedAuth ? storedAuth.split(':') : [null, null];

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
  }

  public getProducts(getProductDto: GetProductDto): Observable<any> {
    if (getProductDto.categories.length !== 0) {
      const options = {
        headers: this.httpOptions.headers,
        params: new HttpParams().set(
          'category_id',
          getProductDto.categories.join(',')
        ),
      };
      return this.httpClient.get<any>(this.apiUrl, options);
    } else {
      return this.httpClient.get<any>(this.apiUrl, this.httpOptions);
    }
  }

  public getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
