import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilityService, ConnectService } from "../../../_services";
import { Router } from "@angular/router";
import { MainComponent } from "../main.component";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-transfer-ta-tokenization",
  templateUrl: "./transfer-ta-tokenization.component.html",
  styleUrls: ["./transfer-ta-tokenization.component.css"],
})
export class TransferTaTokenizationComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private connectService: ConnectService,
    private mainComponent: MainComponent
  ) {
    this.utility.updatePageSEO(
      "Transfer Ta Token | NFT",
      "Transfer Ta Token | NFT"
    );
  }
  form: FormGroup;
  userId = JSON.parse(localStorage.getItem("user"))["id"];
  startDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() + 30)),
    "yyyy-MM-dd",
    "en"
  );
  isChecked = true;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      from_account: [null, Validators.required],
      tokenId: [null, Validators.required],
      to_account: [null, Validators.required],
      numberOfToken: [null, Validators.required],
      notes: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }
  async transferAction() {
    // safeTransferFrom
    console.log("=======>safeTransferFromTo<=== ", this.form.value);
    console.log(
      "===========> this.mainComponent.userWalletAddress ",
      this.mainComponent.userWalletAddress
    );
    console.log(
      "===========> this.connectService.account ",
      this.connectService.account
    );
    this.mainComponent.userWalletAddress = this.connectService.account;

    console.log(
      "===========> this.mainComponent.userWalletAddress ",
      this.mainComponent.userWalletAddress
    );
    console.log(
      "===========> this.connectService.account ",
      this.connectService.account
    );

    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      const respApprove = await this.connectService.setApprovedByowner();
      //commented above so that Robo to kars can be executed as well.
      // const respApprove = true;

      console.log("===========> 2respApprove <==========", respApprove);
      if (respApprove) {
        this.utility.startLoader();
        console.log("===1 transferAction", respApprove);
        const resp = await this.connectService.safeTransferFromTo(
          this.form.value.from_account,
          this.form.value.to_account,
          this.form.value.tokenId,
          this.form.value.numberOfToken,
          this.form.value.notes
        );
        // const resp = true;
        console.log("=====> responce safeTransferFromTo <====", resp);

        this.utility.stopLoader();
        if (resp) {
          // $("#modelId").modal("hide");
          // this.updateTransferById(this.selectedItem.id, { status: "TRANSFERRED" });

          this.utility.showSuccessAlert(
            "Success",
            "TA Token Transfer Successfully"
          );
        }
      } else {
        console.log("===2 transferAction", respApprove);

        this.utility.showErrorAlert("Error", "Something went wrong");
      }
    } else {
      console.log("===3 transferAction", "==3 transferAction");

      this.utility.showErrorAlert(
        "Error",
        "Please choose authorized metamask account in order to approve this request"
      );
    }
  }
}
