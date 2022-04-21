import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UtilityService, UserService } from '../../../_services';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/_helpers/mustMatch.validator';
@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.utility.updatePageSEO('My Profile | NFT', 'My Profile | NFT', '', '');
  }

  form: FormGroup;
  updatePasswordForm: FormGroup;
  public user: any = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.form = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

    this.updatePasswordForm = this.formBuilder.group(
      {
        old_password: [null, [Validators.required, Validators.minLength(6)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirm_password: [
          null,
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validator: [MustMatch('password', 'confirm_password')],
      }
    );
  }

  get getForm() {
    return this.form.controls;
  }

  get getupdatePasswordForm() {
    return this.updatePasswordForm.controls;
  }

  updateProfileAction() {
    this.userService.updateUser(this.user.id, this.form.value).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.user.name = this.form.value.name;
        this.user.email = this.form.value.email;
        this.utility.setItem('user', JSON.stringify(this.user));
        this.utility.showSuccessAlert(
          'Success!',
          'Profile updated successfully'
        );
        this.router.navigate(['/app/user-profile']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  updatePasswordAction() {
    this.userService
      .updatePassword(this.user.id, this.updatePasswordForm.value)
      .subscribe(
        (res) => {
          this.utility.stopLoader();
          this.updatePasswordForm.reset();
          this.utility.showSuccessAlert(
            'Success!',
            'Password updated successfully'
          );
          
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
  }
}
