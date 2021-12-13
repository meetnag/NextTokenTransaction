import { RouterModule } from '@angular/router';
import { ErrorFieldComponent } from './../error-field/error-field.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';



@NgModule({
  declarations: [ErrorFieldComponent, SidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule
  ],
  exports:[SidebarComponent, HeaderComponent, ErrorFieldComponent]
})
export class SharedModule { }
