import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  UtilityService,
  TransferService,
  UserService,
  CoinService,
  InvoiceService
} from "../../../_services";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.css"],
})
export class TransferComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private userService: UserService,
    private coinService: CoinService,
    private invoiceService: InvoiceService
  ) {
    this.utility.updatePageSEO("Transfer Token | NFT", "Transfer Token | NFT");
  }

  form: FormGroup;
  user: any = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.form = this.formBuilder.group({
      tokenId: [null, Validators.required],
      numberOfToken: [null, Validators.required],
      description: [null, Validators.required],
      invoice_no: ["", Validators.required],
      status: ["REQUESTED", Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        console.log(res);
        let userData: any = res;
        userData.forEach((element) => {
          if (element.role !== "admin") {
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
    let formData = this.form.value;
    let tokenId = formData.tokenId;
    let list: any = [];
    this.utility.startLoader();
    this.coinService.getCoinByTokenId(tokenId).subscribe(
      (res:any) => {
        list = res;
        console.log ("list is ==> ", list);

        if (list.length === 0) {
          this.invoiceService.getCoinByTokenId(tokenId).subscribe(
            (resInvoice) => {
              list = resInvoice;
              if (list.length !== 0) {
                formData["user"] = this.user.id;
                formData["vendor_accepted_token"] = 2;
                formData["agreement1"] = list[0].agreement1;
                formData["agreement2"] = list[0].agreement2;
                formData["agreement3"] = list[0].agreement3;
                formData["agreement1_id"] = list[0].agreement1_id;
                formData["agreement2_id"] = list[0].agreement2_id;
                formData["agreement3_id"] = list[0].agreement3_id;
                console.log ("formData==> ", formData);
                this.transferService.createTransfer(formData).subscribe(
                  (res) => {
                    this.utility.stopLoader();
                    this.utility.showSuccessAlert(
                      "Success!",
                      "Transfer Request Has been placed successfully"
                    );
                    this.form.reset();
                    this.router.navigate(["app/transfer-request"]);
                  },
                  (error) => {
                    this.utility.stopLoader();
                    this.utility.showErrorAlert("Error", error);
                  }
                );
              }else{
                this.utility.stopLoader();
                this.utility.showErrorAlert("Error", 'TokenId is worng');
              }
            },
            (error) => {
              this.utility.stopLoader();
              this.utility.showErrorAlert("Error", error);
            }
          );
        }else{
          formData["user"] = this.user.id;
          formData["vendor_accepted_token"] = 2;
          formData["agreement1"] = list[0].agreement;
          formData["agreement2"] = list[0].credit_Enhancement;
          formData["agreement3"] = list[0].guarantee;
          formData["agreement1_id"] = list[0].agreement_id;
          formData["agreement2_id"] = list[0].credit_Enhancement_id;
          formData["agreement3_id"] = list[0].guarantee_id;
          console.log ("formData2 ==> ", formData);

          this.transferService.createTransfer(formData).subscribe(
            (res) => {
              this.utility.stopLoader();
              this.utility.showSuccessAlert(
                "Success!",
                "Transfer Request Has been placed successfully"
              );
              this.form.reset();
              this.router.navigate(["app/transfer-request"]);
            },
            (error) => {
              this.utility.stopLoader();
              this.utility.showErrorAlert("Error", error);
            }
          );
        }
        this.utility.stopLoaderWithTableReload();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
}
