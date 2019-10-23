import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public getToken(): string {
    let token = localStorage.getItem('token');
    return token && JSON.parse(token).token || null;
  }

  public isLogin(): boolean {
    return !!this.getToken();
  }
}
