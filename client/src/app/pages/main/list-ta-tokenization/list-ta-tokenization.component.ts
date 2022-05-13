import { Component, OnInit } from "@angular/core";
import {
  UtilityService,
  ConnectService,
  TaTokenService,
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
  selector: "app-list-ta-tokenization",
  templateUrl: "./list-ta-tokenization.component.html",
  styleUrls: ["./list-ta-tokenization.component.css"],
})
export class ListTaTokenizationComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private connectService: ConnectService,
    private invoiceService: TaTokenService,
    private mainComponent: MainComponent,
    private formBuilder: FormBuilder
  ) {
    this.utility.updatePageSEO(
      "List Of TA Documents | NFT",
      "List Of TA Documents | NFT"
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
      flag: [null],
    });
    this.getTokenList();
  }

  get getForm() {
    return this.form.controls;
  }

  getTokenList() {
    this.utility.startLoader();
    this.invoiceService.getTaTokens().subscribe(
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
    console.log("===========> this =");
    console.log("===========> iteam =", iteam);
    var str = iteam.invoiceNo;
    console.log("pass");

    // var index = this.useremail.indexOf( "@");
    var i = this.useremail.indexOf("@");
    console.log("pass1");
    var startIndex = (i * 0.2) | 0;
    console.log("pass2");
    var endIndex = (i * 0.9) | 0;
    console.log("pass3");
    var obfuscatedEmail =
      this.useremail.slice(0, startIndex) +
      this.useremail.slice(startIndex, endIndex).replace(/./g, "*") +
      this.useremail.slice(endIndex);
    console.log("pass4");
    console.log("===> v <==", str);

    const agr =
      "  Reference: " +
      str.substring(str.length - 3, str.length) +
      " | " +
      iteam.tokens +
      " | " +
      this.todayDate;
    console.log("pass5");

    console.log("ListTaTokenizationComponent : ar_account :: agr :: ", agr);

    console.log(
      "ListTaTokenizationComponent : this.mainComponent.userWalletAddress==>",
      this.mainComponent.userWalletAddress
    );
    console.log(
      "ListTaTokenizationComponent : this.connectService.account==>",
      this.connectService.account
    );

    const resp = await this.connectService.recordOnBlockchain(
      this.connectService.account,
      // "0x39a1531a8e244c79b71d38cc276d443c63091e0c",
      obfuscatedEmail,
      agr
    );
    console.log("======ListTaTokenizationComponent=====> resp :: ", resp);
    this.utility.stopLoader();

    return resp;
  }
  async approveLender(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveTaToken(iteam.id, { lender_approver: 1 })
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
  rejectLender(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveTaToken(iteam.id, { lender_approver: 0 })
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
  async approveVendor(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveTaToken(iteam.id, { vendor_signer: 1 })
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
  rejectVendor(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveTaToken(iteam.id, { vendor_signer: 0 })
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
        .approveTaToken(iteam.id, { owner_approver: 1 })
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
      .approveTaToken(iteam.id, { owner_approver: 0 })
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

  async approveInternal(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveTaToken(iteam.id, { internal_approver: 1 })
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

  rejectInternal(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveTaToken(iteam.id, { internal_approver: 0 })
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

  async approveExternal(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveTaToken(iteam.id, { external_signer: 1 })
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
  rejectExternal(iteam) {
    this.utility.startLoader();
    this.invoiceService
      .approveTaToken(iteam.id, { external_signer: 0 })
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
  async approveInvbuyer(iteam) {
    const resp = await this.approve(iteam);
    if (resp) {
      this.utility.startLoader();
      this.invoiceService
        .approveTaToken(iteam.id, { invbuyer_signer: 1 })
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
      .approveTaToken(iteam.id, { invbuyer_signer: 0 })
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

  async cashTxnComplete(iteam) {
    const resp = await this.approve(iteam);
    // const resp = true;
    if (resp) {
      this.invoiceService.approveTaToken(iteam.id, { cashTxn: 1 }).subscribe(
        (res) => {
          this.getTokenList();
          this.utility.showSuccessAlert(
            "Success",
            "I consent to the completion of the cash transaction by signing this document."
          );
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert("Error", error);
        }
      );
    } else {
      this.utility.showErrorAlert(
        "Error",
        "I cannot consent to the completion of the Cash Transaction."
      );
    }
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
          .updateTaToken(iteam.id, { tokenId: tokenId })
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

  openModelformanager(item) {
    this.form.patchValue({
      id: item.id,
      agreement5: null,
      flag: null,
    });
    $("#modelIdForManager").modal("show");
  }

  openModel(item) {
    this.form.patchValue({
      id: item.id,
      agreement5: null,
      flag: null,
    });
    $("#modelId").modal("show");
  }

  convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(";base64,") + ";base64,".length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  async updateDocumentForManager() {
    console.log("===> updateDocument <====", this.form.value);

    const file = (<HTMLInputElement>document.getElementById("document4"))
      .files[0];

    var self = this;
    // const preview = document.getElementById("preview");
    const reader = new FileReader();
    let byteArray;

    let fianalJSON = {
      id: "",
      name: "",
      flag: 0,
    };
    if (this.form.value.flag) {
      fianalJSON["flag"] = 1;
    }
    // var fianalJSON = {};
    fianalJSON["name"] = file.name;

    await reader.addEventListener(
      "loadend",
      async function () {
        // convert image file to base64 string

        byteArray = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....");
        var result = await ipfs.add(byteArray);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        console.log("=======> agreement5_id <=====", result["path"]);

        fianalJSON["id"] = result["path"];

        await self.uploadfile1(fianalJSON);
      },
      false
    );

    if (file) {
      await reader.readAsDataURL(file);
    }
  }

  uploadfile1(fianalJSON) {
    this.invoiceService
      .updateTaTokenDocument(this.form.value.id, fianalJSON)
      .subscribe(
        (res) => {
          this.invoiceService
            .approveTaToken(this.form.value.id, {
              external_signer: 2,
              vendor_signer: 2,
              lender_approver: 2,
              owner_approver: 2,
            })
            .subscribe(
              (res) => {
                $("#modelIdForManager").modal("hide");
                this.getTokenList();
              },
              (error) => {
                this.utility.stopLoader();
                this.utility.showErrorAlert("Error", error);
              }
            );
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert("Error", error);
        }
      );
  }

  async updateDocument() {
    console.log("===> updateDocument 1 <====", this.form.value);

    const file = (<HTMLInputElement>document.getElementById("document5"))
      .files[0];

    var self = this;
    // const preview = document.getElementById("preview");
    const reader = new FileReader();
    let byteArray;

    let fianalJSON = {
      id: "",
      name: "",
      flag: 0,
    };
    if (this.form.value.flag) {
      fianalJSON["flag"] = 1;
    }
    // var fianalJSON = {};
    fianalJSON["name"] = file.name;

    await reader.addEventListener(
      "loadend",
      async function () {
        // convert image file to base64 string

        byteArray = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....");
        var result = await ipfs.add(byteArray);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        console.log("=======> agreement5_id <=====", result["path"]);

        fianalJSON["id"] = result["path"];

        await self.uploadfile2(fianalJSON);
      },
      false
    );

    if (file) {
      await reader.readAsDataURL(file);
    }
  }

  uploadfile2(fianalJSON) {
    this.invoiceService
      .updateTaTokenDocument(this.form.value.id, fianalJSON)
      .subscribe(
        (res) => {
          this.invoiceService
            .approveTaToken(this.form.value.id, { owner_approver: 2 })
            .subscribe(
              (res) => {
                $("#modelId").modal("hide");
                this.getTokenList();
              },
              (error) => {
                this.utility.stopLoader();
                this.utility.showErrorAlert("Error", error);
              }
            );
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert("Error", error);
        }
      );
  }
}
