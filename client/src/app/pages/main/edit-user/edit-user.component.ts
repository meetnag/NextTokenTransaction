import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, UserService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.utility.updatePageSEO(
      'Update User | NFT',
      'Update User | NFT',
      '',
      ''
    );
  }

  userId = this.activatedRoute.snapshot.paramMap.get('userId');
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      status: [null, Validators.required],
      role: [null, Validators.required],
    });

    this.getUser();
  }

  get getForm() {
    return this.form.controls;
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.form.value).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert('Success!', 'User updated successfully');
        this.router.navigate(['app/users']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      (res) => {
        let user:any = res
        this.form.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        });
        this.utility.stopLoader();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
