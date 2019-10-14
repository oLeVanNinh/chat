import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { User } from "../model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {}

  formValid(): boolean {
    return this.user.username && this.user.username.length >= 6 && this.user && this.user.password.length >= 6
  }

  getToken() {
    this.formValid && this.loginService.getToken(this.user.username, this.user.password).subscribe((token) => {
      localStorage.setItem("token", token);
      this.router.navigateByUrl("");
    })
  }
}
