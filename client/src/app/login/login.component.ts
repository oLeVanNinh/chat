import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { SessionService } from '@services/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {}

  formValid(): boolean {
    return this.user.username && this.user.username.length >= 6 && this.user && this.user.password.length >= 6;
  }

  getToken(): void {
    if (this.formValid) {
      this.sessionService.getToken(this.user.username, this.user.password).subscribe((token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.router.navigateByUrl('');
      });
    }
  }
}
