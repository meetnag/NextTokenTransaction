import { SharedModule } from "./../../_components/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from "./users/users.component";
import { AvatarModule } from "ngx-avatar";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { CreateTokenComponent } from "./create-token/create-token.component";
import { SetRoleComponent } from "./set-role/set-role.component";
import { TransferComponent } from "./transfer/transfer.component";
import { TransferRequestComponent } from "./transfer-request/transfer-request.component";
import { ListTokenComponent } from "./list-token/list-token.component";
import { BurnTokenComponent } from "./burn-token/burn-token.component";
import { BalanceComponent } from "./balance/balance.component";
import { AcceptPaymentComponent } from "./accept-payment/accept-payment.component";
import { InvoiceTokenComponent } from './invoice-token/invoice-token.component';
import { ListInvoiceTokenComponent } from './list-invoice-token/list-invoice-token.component';
import { TransferTokenComponent } from './transfer-token/transfer-token.component';
import { TaTokenizationComponent } from './ta-tokenization/ta-tokenization.component';
import { ListTaTokenizationComponent } from './list-ta-tokenization/list-ta-tokenization.component';
import { TransferTaTokenizationComponent } from './transfer-ta-tokenization/transfer-ta-tokenization.component';
import { WrapperTokenizationComponent } from './wrapper-tokenization/wrapper-tokenization.component';
import { ListWrapperTokenizationComponent } from './list-wrapper-tokenization/list-wrapper-tokenization.component';
import { TransferWrapperTokenizationComponent } from './transfer-wrapper-tokenization/transfer-wrapper-tokenization.component';
@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    UserProfileComponent,
    AddUserComponent,
    EditUserComponent,
    CreateTokenComponent,
    SetRoleComponent,
    TransferComponent,
    TransferRequestComponent,
    ListTokenComponent,
    BurnTokenComponent,
    BalanceComponent,
    AcceptPaymentComponent,
    InvoiceTokenComponent,
    ListInvoiceTokenComponent,
    TransferTokenComponent,
    TaTokenizationComponent,
    ListTaTokenizationComponent,
    TransferTaTokenizationComponent,
    WrapperTokenizationComponent,
    ListWrapperTokenizationComponent,
    TransferWrapperTokenizationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule,
    AvatarModule,
  ],
})
export class MainModule {}
