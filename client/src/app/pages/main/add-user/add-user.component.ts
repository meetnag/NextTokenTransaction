import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UtilityService,
  UserService
} from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.utility.updatePageSEO(
      'Create User | NFT',
      'Create User | NFT',
      '',
      ''
    );
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      is_email_verified: [true, Validators.required],
      role: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  addUser() {
    this.userService.createUser(this.form.value).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert(
          'Success!',
          'User added successfully'
        );
        this.router.navigate(['app/users']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
