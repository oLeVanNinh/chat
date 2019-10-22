import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public getToken(): string {
    let token = localStorage.getItem('token');
    return JSON.parse(token).token;
  }

  public isLogin(): boolean {
    return !!this.getToken();
  }
}
