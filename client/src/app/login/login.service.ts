import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()

export class LoginService {
  constructor(private http: HttpClient) {}

  getToken(username, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }

    const params = new HttpParams({fromObject: {
      username: username,
      password: password
    }})

    return this.http.post('/gen_token', params, httpOptions);
  }
}
