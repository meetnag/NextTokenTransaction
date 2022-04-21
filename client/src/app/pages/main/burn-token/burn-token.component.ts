import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UtilityService,
  ConnectService,
} from '../../../_services';
import { MainComponent } from '../main.component';

@Component({
  templateUrl: './burn-token.component.html',
  styleUrls: ['./burn-token.component.css'],
})
export class BurnTokenComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private connectService: ConnectService,
    private mainComponent: MainComponent
  ) {
    this.utility.updatePageSEO('Burn Token | NFT', 'Burn Token | NFT');
  }

  form: FormGroup;
  userId = JSON.parse(localStorage.getItem('user'))['id'];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [null, Validators.required],
      tokenId: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  async burnToken() {
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      await this.connectService.burnToken(
        this.form.value.address,
        this.form.value.tokenId,
        this.form.value.amount
      );
      this.form.reset();
      this.utility.stopLoader();
       this.utility.showSuccessAlert(
        'Success',
        'Token Burned Successfully!'
      );
    }
     else {
      this.utility.showErrorAlert(
        'Error',
        'Please choose authorized metamask account in order to approve this request'
      );
    }
  }
}
