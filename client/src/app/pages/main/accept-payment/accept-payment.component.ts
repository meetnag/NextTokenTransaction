import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import {
  UtilityService,
  TransferService,
  UserService,
  ConnectService,
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
    private userService: UserService,
    private connectService: ConnectService
  ) {
    this.utility.updatePageSEO("Accept Payment | NFT", "Accept Payment | NFT");
  }

  form: FormGroup;
  user: any = [];
  transfers: any = [];
  startDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() + 30)),
    "MM-dd-yyyy",
    "en"
  );
  todayDate = formatDate(new Date(), "MM-dd-yyyy", "en");
  userRole = JSON.parse(localStorage.getItem("user"))["role"];
  useremail = JSON.parse(localStorage.getItem("user"))["email"];

  done = false;
  acceptButtonHit = false;
  ngOnInit(): void {
    this.getTransfer();
    // this.startDate = formatDate(this.startDate, "yyyy-MM-dd", "en");
    this.form = this.formBuilder.group({
      ar_account: [
        "0x39A1531a8e244C79b71d38cc276d443c63091E0C",
        Validators.required,
      ],
      id: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }
  getTransfer() {
    this.utility.startLoader();
    this.transferService
      .findTransfers({
        status: "ACCEPTED",
        vendor_accepted_token: 2,
      })
      .subscribe(
        (res: any) => {
          console.log("=====> call <==getTransfer===", res);
          this.utility.stopLoader();
          if (res.length != 0) {
            this.form.patchValue({
              id: res[0].id,
            });
          } else {
            if (this.acceptButtonHit) this.done = true;
          }
          this.transfers = res;
        },
        (error) => {
          console.log(error);
          this.utility.stopLoader();
        }
      );
  }

  async upload(item) {
    // this.utility.startLoader();
    // //console.log("===========> this =", this);
    // var str = this.transfers[0].invoice_no;
    // //var index = this.useremail.indexOf( "@");
    // var i = this.useremail.indexOf('@');
    // var startIndex = i * .2 | 0;
    // var endIndex   = i * .9 | 0;
    // var obfuscatedEmail = this.useremail.slice(0, startIndex) +
    // this.useremail.slice(startIndex, endIndex).replace(/./g, '*') +
    // this.useremail.slice(endIndex);

    // //const agr = this.form.value.invoice_no +"|"+ this.form.value.numberOfToken +"|"+ this.todayDate;
    // const agr = "  Reference: " + str.substring((str.length)-3,str.length) + " | " + this.transfers[0].numberOfToken + " | " + this.todayDate;

    // //console.log("invoice_no "  ,   this.transfers[0].invoice_no );
    // //console.log("ar_account "  ,  this.form.controls.ar_account.value);
    // console.log("ar_account "  ,  agr);

    // const resp = await this.connectService.recordOnBlockchain(
    //   this.form.controls.ar_account.value,
    //   obfuscatedEmail,
    //   agr
    // );
    //  console.log("===========> resp <====in transfer==",resp);
    // this.utility.stopLoader();
    const resp = true;
    if (resp) {
      this.utility.startLoader();
      this.transferService
        .updateTransfer(item.id, {
          vendor_accepted_token: 1,
          ar_account: this.form.value.ar_account,
        })
        .subscribe(
          (res) => {
            this.utility.stopLoader();
            this.acceptButtonHit = true;
            // this.router.onSameUrlNavigation = "reload";
            this.getTransfer();
            // this.router.navigate(['app/accept-payment']);
            // window.location.reload();
          },
          (error) => {
            console.log(error);
            this.utility.stopLoader();
            this.utility.showErrorAlert("Error", error);
          }
        );
    }

    // this.updateTransferById(item.id, { status: 'REJECTED' });
  }
}
