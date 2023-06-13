import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class ProtocolService {
  apiUrl = `${environment.apiUrl}/stock/protocols`;
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

  public getProtocols(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl, this.httpOptions);
  }

  public deleteProtocol(protocol_id: string): any {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/${protocol_id}`,
      this.httpOptions,
    );
  }

  createProtocol(protocolData: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/`,
      protocolData,
      this.httpOptions,
    );
  }

  patchProtocol(id, body): any {
    console.log(id, body);
    return this.httpClient.patch<any>(
      `${this.apiUrl}/${id}/`,
      body,
      this.httpOptions,
    );
  }
}
