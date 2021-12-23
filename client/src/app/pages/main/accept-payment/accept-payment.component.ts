import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import {
  UtilityService,
  TransferService,
  UserService,
} from "../../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-accept-payment",
  templateUrl: "./accept-payment.component.html",
  styleUrls: ["./accept-payment.component.css"],
})
export class AcceptPaymentComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private userService: UserService
  ) {
    this.utility.updatePageSEO("Accept Payment | NFT", "Accept Payment | NFT");
  }

  form: FormGroup;
  user: any = [];
  transfers: any = [];
  startDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 30)),"MM-dd-yyyy", "en");
  todayDate = formatDate(new Date(), "MM-dd-yyyy", "en");
  userRole = JSON.parse(localStorage.getItem('user'))['role'];

  ngOnInit(): void {
    this.getTransfer();
    // this.startDate = formatDate(this.startDate, "yyyy-MM-dd", "en");
    this.form = this.formBuilder.group({
      ar_account: ["0x39A1531a8e244C79b71d38cc276d443c63091E0C", Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  getTransfer() {
    this.utility.startLoader();
    this.transferService.findTransfers({
      status:"APPROVED",
      vendor_accepted_token:2
    }).subscribe(
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

  upload(item) {
    this.utility.startLoader();
    this.transferService.updateTransfer(item.id, {vendor_accepted_token:1, ar_account:this.form.value.ar_account}).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.getTransfer();
        // this.router.navigate(['app/accept-payment']);
      },
      (error) => {
        console.log(error);
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
    // this.updateTransferById(item.id, { status: 'REJECTED' });
  }
}
