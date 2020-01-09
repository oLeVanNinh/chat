import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { SessionService } from '@services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  ngForm: NgForm;
  isLoggin = true;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {}

  formValid(loginForm: any): boolean {
    return loginForm.username && loginForm.username.length >= 6 && loginForm.password && loginForm.password.length >= 6;
  }

  getToken(form: NgForm): void {
    const loginForm = form.value;
    const formValid = this.formValid(loginForm);
    if (formValid) {
      this.sessionService.getToken(loginForm.username, loginForm.password).subscribe((token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.router.navigateByUrl('');
      });
    }
  }

  toggleLoginState(): void {
    this.isLoggin = !this.isLoggin;
  }
}
