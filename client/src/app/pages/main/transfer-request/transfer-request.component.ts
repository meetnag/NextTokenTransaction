import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UtilityService,
  TransferService,
  ConnectService,
} from '../../../_services';
import { Router } from '@angular/router';
import { MainComponent } from '../main.component';
declare var $: any;

@Component({
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.css'],
})
export class TransferRequestComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private connectService: ConnectService,
    private mainComponent: MainComponent
  ) {
    this.utility.updatePageSEO('Transfer Token | NFT', 'Transfer Token | NFT');
  }

  form: FormGroup;
  transfers: any = [];
  userId = JSON.parse(localStorage.getItem('user'))['id'];
  userRole = JSON.parse(localStorage.getItem('user'))['role'];
  



  selectedItem: any = [];

  ngOnInit(): void {
    console.log("userid is ====>", this.userId);
    console.log("userrole is ====>", this.userRole);
    this.getAllTransfers();
    this.form = this.formBuilder.group({
      invoice: [null, [Validators.required]],
      tokenId: [null, [Validators.required]],
      numberOfToken: [null, [Validators.required]],
      address: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  getAllTransfers() {
    this.utility.startLoader();
    this.transferService.getTransfers().subscribe(
      (res) => {
        console.log(res);
        this.transfers = res;
        this.utility.stopLoader();
      },
      (error) => {
        console.log(error);
        this.utility.stopLoader();
      }
    );
  }

  async approveTransfer(item) {
    console.log("==approveTransfer==> this.mainComponent.userWalletAddress <====", this.mainComponent.userWalletAddress);
    console.log("==approveTransfer==> this.connectService.account <====",this.connectService.account);
    
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      let resp: any;
      if (this.userRole === 'owner') {
        resp = await this.connectService.setApprovedByowner();
      } else {
        resp = await this.connectService.setApprovedByManager();
      }
      // resp = true

      if (resp) {
        this.utility.stopLoader();
        this.updateTransferById(item.id, { status: 'APPROVED' });
      } else {
        this.utility.showErrorAlert('Error', 'Something went wrong');
      }
    } else {
      this.utility.showErrorAlert(
        'Error',
        'Please choose authorized metamask account in order to approve this request'
      );
    }
  }

  rejectTransfer(item) {
    this.updateTransferById(item.id, { status: 'REJECTED' });
  }

  openTransferModal(item) {
    this.selectedItem = item
    console.log(this.selectedItem);
    
    this.form.patchValue({
      invoice: this.selectedItem.invoice_no,
      tokenId: this.selectedItem.tokenId,
      numberOfToken: this.selectedItem.numberOfToken,
      address: this.selectedItem.ar_account,

    });
    $('#modelId').modal('show');
  }

  async transferAction() {
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      const resp = await this.connectService.safeTransferFrom(
        this.form.value.address,
        this.form.value.tokenId,
        this.form.value.numberOfToken,
        this.form.value.data
      );
      // const resp = true;
      this.utility.stopLoader();
      if (resp) {
        $('#modelId').modal('hide');
        this.updateTransferById(this.selectedItem.id, { status: 'TRANSFERED' });
      }
    } else {
      this.utility.showErrorAlert(
        'Error',
        'Please choose authorized metamask account in order to approve this request'
      );
    }
  }

  updateTransferById(id, data) {
    this.utility.startLoader();
    this.transferService.updateTransfer(id, data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.getAllTransfers();
      },
      (error) => {
        console.log(error);
        this.utility.stopLoaderWithTableReload();
      }
    );
  }
}
