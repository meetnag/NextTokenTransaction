import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, UserService, ConnectService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.css'],
})
export class SetRoleComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private connectService: ConnectService
  ) {
    this.utility.updatePageSEO('Set Role | NFT', 'Set Role | NFT');
  }

  form: FormGroup;
  user: any = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  async addRole() {
    let formData: any = {};
    if (this.form.value.role === 'MANAGER') {
      this.utility.startLoader();
      const response = await this.connectService.setManager(
        this.form.value.address
      );
      this.utility.stopLoader();
      if (response) {
        formData['manager'] = this.form.value.address;
        this.saveUserData(formData);
      }
      
    } else {
      this.utility.startLoader();
      const response = await this.connectService.setOwner(
        this.form.value.address
      );
      this.utility.stopLoader();
      if (response) {
        formData['user'] = this.form.value.address;
        this.saveUserData(formData);
      }
    }
    
  }

  saveUserData(data) {
    this.utility.startLoader()
    this.userService.updateUser(this.user.id, data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert('Success!', 'User added successfully');
        this.form.reset();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
