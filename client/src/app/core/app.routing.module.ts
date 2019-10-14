import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "../user/user.component";
import { LoginComponent } from "../login/login.component";
import { ChatDashBoardComponent } from "../chat-dash-board/chat-dash-board.component";
import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: ChatDashBoardComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
