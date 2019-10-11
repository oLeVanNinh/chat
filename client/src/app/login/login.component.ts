import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user = {
    username: "",
    password: ""
  }

  constructor(private loginService: LoginService) { }

  ngOnInit() {}


  getToken() {
    this.loginService.getToken(this.user.username, this.user.password).subscribe((token) => {
      //Todo: handle token
    })
  }
}
