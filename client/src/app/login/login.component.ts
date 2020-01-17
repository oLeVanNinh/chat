import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  ngForm: NgForm;
  isLoggin = true;
  errorMessage = '';

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {}

  formValid(loginForm: any): boolean {
    let commonCheck = loginForm.username && loginForm.username.length >= 6 && loginForm.password && loginForm.password.length >= 6;
    if (!this.isLoggin) {
      const passwordMatch = loginForm.password_confirmation.length >= 6 && loginForm.password_confirmation === loginForm.password;
      commonCheck = commonCheck && passwordMatch;
    }
    return commonCheck;
  }

  getToken(form: NgForm): void {
    const loginForm = form.value;
    const formValid = this.formValid(loginForm);
    const action = this.isLoggin ? 'login' : 'singup';
    if (formValid) {
      this.sessionService.getToken(action, loginForm).subscribe((token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.errorMessage = '';
        this.router.navigateByUrl('');
      },
      (err) => {
        this.errorMessage = err.error.message;
      });
    }
  }

  toggleLoginState(): void {
    this.isLoggin = !this.isLoggin;
    this.errorMessage = '';
  }
}
