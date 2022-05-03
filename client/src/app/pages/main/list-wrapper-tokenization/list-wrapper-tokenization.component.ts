import { Component, OnInit } from "@angular/core";
import {
  UtilityService,
  ConnectService,
  WrapperTokenService,
} from "../../../_services";
import { MainComponent } from "../main.component";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
const IpfsHttpClient = require("ipfs-http-client");

const ipfs = new IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

declare var $: any;

@Component({
  selector: "app-list-wrapper-tokenization",
  templateUrl: "./list-wrapper-tokenization.component.html",
  styleUrls: ["./list-wrapper-tokenization.component.css"],
})
export class ListWrapperTokenizationComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private connectService: ConnectService,
    private invoiceService: WrapperTokenService,
    private mainComponent: MainComponent,
    private formBuilder: FormBuilder
  ) {
    this.utility.updatePageSEO(
      "List Of Wrapper Documents | NFT",
      "List Of Wrapper Documents | NFT"
    );
  }

  form: FormGroup;
  user: String = JSON.parse(localStorage.getItem("user"));
  todayDate = formatDate(new Date(), "MM-dd-yyyy", "en");
  userRole = JSON.parse(localStorage.getItem("user"))["role"];
  useremail = JSON.parse(localStorage.getItem("user"))["email"];
  public coinList: any = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      agreement5: [null, Validators.required],
    });
    this.getTokenList();
  }

  get getForm() {
    return this.form.controls;
  }

  getTokenList() {
    this.utility.startLoader();
    this.invoiceService.getWrapperTokens().subscribe(
      (res) => {
        console.log("======> coinlist <== ", res);
        this.coinList = res;
        this.utility.stopLoaderWithTableReload();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }

  async approve(iteam) {
    this.utility.startLoader();
    console.log("========ListWrapperTokenizationComponent===> this =");
    var str = iteam.invoiceNo;
    // var index = this.useremail.indexOf( "@");
    var i = this.useremail.indexOf("@");
    var startIndex = (i * 0.2) | 0;
    var endIndex = (i * 0.9) | 0;
    var obfuscatedEmail =
      this.useremail.slice(0, startIndex) +
      this.useremail.slice(startIndex, endIndex).replace(/./g, "*") +
      this.useremail.slice(endIndex);

    const agr =
      "  Reference: " +
      str.substring(str.length - 3, str.length) +
      " | " +
      iteam.tokens +
      " | " +
      this.todayDate;

    console.log(
      "ListWrapperTokenizationComponent : ar_account :: agr :: ",
      agr
    );
    console.log(
      "ListWrapperTokenizationComponent : ar_account :: ",
      this.connectService.account
    );
    console.log(
      "ListWrapperTokenizationComponent : this.mainComponent.userWalletAddress :: ",
      this.mainComponent.userWalletAddress
    );

    const resp = await this.connectService.recordOnBlockchain(
      // "0x39a1531a8e244c79b71d38cc276d443c63091e0c",
      this.connectService.account,
      obfuscatedEmail,
      agr
    );
    console.log("======ListWrapperTokenizationComponent=====> resp :: ", resp);
    this.utility.stopLoader();

    return resp;
  }
  async approveInvbuyer(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveWrapperToken(iteam.id, { invbuyer_signer: 1 })
        .subscribe(
          (res) => {
            this.getTokenList();
          },
          (error) => {
            this.utility.stopLoader();
            this.utility.showErrorAlert("Error", error);
          }
        );
    }
  }
  rejectInvbuyer(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveWrapperToken(iteam.id, { invbuyer_signer: 0 })
      .subscribe(
        (res) => {
          this.getTokenList();
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert("Error", error);
        }
      );
  }

  async approvOwner(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveWrapperToken(iteam.id, { owner_approver: 1 })
        .subscribe(
          (res) => {
            this.getTokenList();
          },
          (error) => {
            this.utility.stopLoader();
            this.utility.showErrorAlert("Error", error);
          }
        );
    }
  }

  rejectOwner(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveWrapperToken(iteam.id, { owner_approver: 0 })
      .subscribe(
        (res) => {
          this.getTokenList();
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert("Error", error);
        }
      );
  }

  async upload(iteam) {
    console.log("======> upload iteam <==22222222222=", iteam);
    console.log(
      "======> upload this.mainComponent.userWalletAddress <===",
      this.mainComponent.userWalletAddress
    );
    console.log(
      "======> upload this.connectService.account <===",
      this.connectService.account
    );
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      const tokenId = await this.connectService.nextTokenId();
      console.log("========> token id <=====", tokenId);
      const agr =
        iteam.agreement1 +
        "   " +
        iteam.agreement2 +
        "   " +
        iteam.agreement3 +
        "  ";
      const resp = await this.connectService.createToken(
        iteam.tokens, //numberOfToken,
        agr,
        iteam.description
      );
      // const resp = true;
      // const tokenId = 5241;
      console.log("======upload===> resp <===========", resp);
      if (resp) {
        this.invoiceService
          .updateWrapperToken(iteam.id, { tokenId: tokenId })
          .subscribe(
            (res) => {
              this.getTokenList();
            },
            (error) => {
              this.utility.stopLoader();
              this.utility.showErrorAlert("Error", error);
            }
          );
      }
    } else {
      this.utility.showErrorAlert(
        "Error",
        "Please choose authorized metamask account in order to approve this request"
      );
    }
  }

  async cashTxnComplete(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.showSuccessAlert(
        "Success",
        "I consent to the completion of the cash transaction by signing this document."
      );
    } else {
      this.utility.showErrorAlert(
        "Error",
        "I cannot consent to the completion of the Cash Transaction."
      );
    }
  }
}
