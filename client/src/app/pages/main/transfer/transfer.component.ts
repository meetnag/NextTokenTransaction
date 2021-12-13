import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, TransferService, UserService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private userService: UserService
  ) {
    this.utility.updatePageSEO('Transfer Token | NFT', 'Transfer Token | NFT');
  }

  form: FormGroup;
  user: any = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.form = this.formBuilder.group({
      tokenId: [null, Validators.required],
      numberOfToken: [null, Validators.required],
      description: [null, Validators.required],
      status: ['REQUESTED', Validators.required],
    });
    
  }

  get getForm() {
    return this.form.controls;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        console.log(res);
        let userData: any = res
        userData.forEach(element => {
          if (element.role !== 'admin') {
            this.user = element;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async createTransferRequest() {
    let formData = this.form.value
    formData['user'] = this.user.id;
    this.transferService.createTransfer(formData).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert(
          'Success!',
          'Transfer Request Has been placed successfully'
        );
        this.form.reset();
        this.router.navigate(['app/transfer-request']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
