import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateTokenComponent } from './create-token/create-token.component';
import { SetRoleComponent } from './set-role/set-role.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransferRequestComponent } from './transfer-request/transfer-request.component';
import { ListTokenComponent } from './list-token/list-token.component';
import { BurnTokenComponent } from './burn-token/burn-token.component';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: AddUserComponent },
      { path: 'users/update/:userId', component: EditUserComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'issue-token', component: CreateTokenComponent },
      { path: 'set-role', component: SetRoleComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'transfer-request', component: TransferRequestComponent },
      { path: 'list-token', component: ListTokenComponent },
      { path: 'burn-token', component: BurnTokenComponent },
      { path: 'check-balance', component: BalanceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
