import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, ConnectService } from '../../../_services';
import { MainComponent } from '../main.component';
import Swal from 'sweetalert2';
@Component({
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
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
      tokenId: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  async checkBalance() {
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      const resp = await this.connectService.balanceOf(
        this.form.value.address,
        this.form.value.tokenId,
      );

 
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'You have total ' + resp + ' tokens',
      });
      this.form.reset();
      this.utility.stopLoader();
      
    } else {
      this.utility.showErrorAlert(
        'Error',
        'Please choose authorized metamask account in order to approve this request'
      );
    }
  }
}
