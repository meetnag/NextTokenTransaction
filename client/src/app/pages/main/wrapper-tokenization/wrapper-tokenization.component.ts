import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  UtilityService,
  WrapperTokenService,
  ConnectService,
} from "../../../_services";
import { Router } from "@angular/router";
import { MainComponent } from "../main.component";
import { formatDate } from "@angular/common";
const IpfsHttpClient = require("ipfs-http-client");

const ipfs = new IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

@Component({
  selector: "app-wrapper-tokenization",
  templateUrl: "./wrapper-tokenization.component.html",
  styleUrls: ["./wrapper-tokenization.component.css"],
})
export class WrapperTokenizationComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mainComponent: MainComponent,
    private connectService: ConnectService,
    private invoiceService: WrapperTokenService
  ) {
    this.utility.updatePageSEO(
      "Wrapper Tokenization | NFT",
      "Wrapper Tokenization | NFT"
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
      invoiceNo: [null, Validators.required],
      tokens: [null, Validators.required],
      agreement1: [null, Validators.required],
      agreement2: [null, Validators.required],
      data: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
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

  async upload() {
    const file = (<HTMLInputElement>document.getElementById("document"))
      .files[0];

    var self = this;
    // const preview = document.getElementById("preview");
    const reader = new FileReader();
    let byteArray;

    var fianalJSON = self.form.value;
    fianalJSON["agreement1"] = file.name;

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
        console.log("=======> agreement1_id <=====", result["path"]);

        fianalJSON["agreement1_id"] = result["path"];

        await self.uploadfile1(fianalJSON);
      },
      false
    );

    if (file) {
      await reader.readAsDataURL(file);
    }
  }
  async uploadfile1(fianalJSON) {
    const file1 = (<HTMLInputElement>document.getElementById("document1"))
      .files[0];

    var self = this;
    const reader = new FileReader();
    let byteArray1;

    fianalJSON["agreement2"] = file1.name;
    await reader.addEventListener(
      "loadend",
      async function () {
        // convert image file to base64 string

        byteArray1 = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....1");
        var result1 = await ipfs.add(byteArray1);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        console.log("=======> agreement2_id <=====", result1["path"]);
        fianalJSON["agreement2_id"] = result1["path"];

        await self.createToken(fianalJSON);
      },
      false
    );

    if (file1) {
      await reader.readAsDataURL(file1);
    }
  }

  async createToken(data) {
    console.log("======> upload data <==22222222222=", data);
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
        data.agreement1 +
        "   " +
        data.agreement2 +
        "   " +
        data.agreement3 +
        "  " +
        data.agreement4 ;
      const resp = await this.connectService.createToken(
        data.tokens, //numberOfToken,
        agr,
        data.data
      );
      // const resp = true;
      // const tokenId = 5241;
      console.log("======upload===> resp <===========", resp);
      if (resp) {
        console.log("===============createToken======> data <=====", data);
        this.utility.startLoader();
        this.saveToken({
          user: this.userId,
          tokenId,
          invoiceNo: data.invoiceNo,
          tokens: data.tokens,
          agreement1: data.agreement1,
          agreement2: data.agreement2,
          agreement3: data.agreement3,
          agreement4: data.agreement4,
          agreement5: data.agreement5,
          agreement1_id: data.agreement1_id,
          agreement2_id: data.agreement2_id,
          agreement3_id: data.agreement3_id,
          agreement4_id: data.agreement4_id,
          agreement5_id: data.agreement5_id,
          description: data.data,
        });
      }
    } else {
      this.utility.showErrorAlert(
        "Error",
        "Please choose authorized metamask account in order to approve this request"
      );
    }
  }

  saveToken(data) {
    this.invoiceService.createWrapperToken(data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert(
          "Success",
          "Wrapper Token Request Created Successfully"
        );
        this.router.navigate(["/app/list-of-wrapper-Tokenization"]);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
}
