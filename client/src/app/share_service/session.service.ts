import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  constructor(private http: HttpClient) {}

  getToken(username, password): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const params = new HttpParams({fromObject: {
      username,
      password
    }});

    return this.http.post<string>('/gen_token', params, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
