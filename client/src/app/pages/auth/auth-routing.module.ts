import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'


const routes: Routes = [ {path: '', redirectTo: 'login', pathMatch: 'full'}, { path: 'login', component: AuthComponent }, {path: 'forgot-password', component: ForgotPasswordComponent}, {path: 'reset-password', component: ResetPasswordComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
