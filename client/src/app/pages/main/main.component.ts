import { UserService } from './../../_services/user.service';
import { Component, OnInit, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private elementRef: ElementRef, private userService: UserService) { }
  
  userRole: String = JSON.parse(localStorage.getItem('user'))['role'];
  public userWalletAddress: string = '';

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        let userData: any = res;
        userData.forEach((element: any) => {
          if (element.role === 'admin') {
            if (this.userRole === 'manager') {
              this.userWalletAddress = element.manager;
            } else {
              this.userWalletAddress = element.user;
            }
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    // $(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
    $('body').tooltip({
      selector: '.tooltp',
    });

    $('#datatable').DataTable({
      ordering: false,
      lengthChange: true,
      paging: true,
    });
  }
}
