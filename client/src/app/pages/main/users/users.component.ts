import { Component, OnInit } from '@angular/core';
import { UtilityService, UserService } from '../../../_services';
@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private utility: UtilityService, private userService: UserService) {
    this.utility.updatePageSEO(
      'User List | NFT', 'User List | NFT', '', ''
    )
  }

  public userList: any = [];

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
      this.utility.startLoader()
      this.userService.getUsers().subscribe(
        (res) => {
          
        this.userList = res
        this.utility.stopLoaderWithTableReload()
        
      },
      (error) => {
        this.utility.stopLoader()
        this.utility.showErrorAlert('Error', error);
      }
    );
  }


}
