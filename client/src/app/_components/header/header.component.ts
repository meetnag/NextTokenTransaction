import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  UtilityService,
  AuthenticationService,
} from '../../_services';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  @Input() walletAddress: any;
  userName: String = JSON.parse(localStorage.getItem('user'))['name'];
  userRole: String = JSON.parse(localStorage.getItem('user'))['role'];

  ngOnInit(): void {}

  logoutAction() {
    this.authService.logout().subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert('Success!', 'Logout Successfully');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  toggleSidebar() {
    if (window.matchMedia('(min-width: 1200px)').matches) {
      $('body').toggleClass('hide-sidebar');
    } else {
      $('body').toggleClass('show-sidebar');
    }
  }
}  
