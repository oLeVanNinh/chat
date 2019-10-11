import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomMaterialModule } from "./core/material.module";
import { AppRoutingModule } from "./core/app.routing.module";
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ApiInterceptor } from "./interceptors/api_interceptor";
import { LoginService } from "./login/login.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
