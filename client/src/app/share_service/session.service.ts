import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  constructor(private http: HttpClient) {}

  getToken(action, userAttributes): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const url = action === 'login' ? '/login' : '/registration';
    const params = new HttpParams({fromObject: userAttributes});

    return this.http.post<string>(url, params, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
