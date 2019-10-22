import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { CustomMaterialModule } from "./core/material.module";
import { AppRoutingModule } from "./core/app.routing.module";
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ApiInterceptor } from "./interceptors/api_interceptor";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { ChatDashBoardComponent } from './chat-dash-board/chat-dash-board.component';
import { MainChatComponent } from "./chat-dash-board/main-chat/mainchat.component";
import { SideBarComponent } from "./chat-dash-board/sidebar/sidebar.component";
import { ChatMembersComponent } from "./chat-dash-board/members/members.component";

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ChatDashBoardComponent,
    MainChatComponent,
    SideBarComponent,
    ChatDashBoardComponent,
    ChatMembersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FontAwesomeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
