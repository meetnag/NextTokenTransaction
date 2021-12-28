import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  UtilityService,
  ConnectService,
  CoinService,
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
  templateUrl: "./create-token.component.html",
  styleUrls: ["./create-token.component.css"],
})
export class CreateTokenComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private connectService: ConnectService,
    private coinService: CoinService,
    private mainComponent: MainComponent
  ) {
    this.utility.updatePageSEO("Issue Token | NFT", "Issue Token | NFT");
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
      amount: [null, Validators.required],
      agreement: [null, Validators.required],
      data: [null, Validators.required],
      days: [60, Validators.required],
      credit_Enhancement: [null, Validators.required],
      renewal: ["Yes", Validators.required],
      guarantee: [null, Validators.required],
      date_of_Expiration: [this.startDate, Validators.required],
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
    const file1 = (<HTMLInputElement>document.getElementById("document1"))
      .files[0];
    const file2 = (<HTMLInputElement>document.getElementById("document2"))
      .files[0];

    console.log("========> file <====", file);
    console.log("========> file <====", file.name);

    console.log("========> file1 <====", file1);
    console.log("========> file1 <====", file1.name);

    console.log("========> file2 <====", file2);
    console.log("========> file2 <====", file2.name);
    var self = this;
    // const preview = document.getElementById("preview");
    const reader = new FileReader();
    let byteArray;
    let byteArray1;
    let byteArray2;
    var fianalJSON = self.form.value;
    fianalJSON["agreement"] = file.name;
    fianalJSON["credit_Enhancement"] = file1.name;
    fianalJSON["guarantee"] = file2.name;
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
        // fianalJSON["agreement"] = result["path"];

        byteArray1 = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....1");
        var result1 = await ipfs.add(byteArray1);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        // fianalJSON["credit_Enhancement"] = result1["path"];

        byteArray2 = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....2");
        var result2 = await ipfs.add(byteArray2);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        // fianalJSON["guarantee"] = result2["path"];
        await self.createToken(fianalJSON);
      },
      false
    );

    if (file) {
      await reader.readAsDataURL(file);
    }
    if (file1) {
      await reader.readAsDataURL(file1);
    }
    if (file2) {
      await reader.readAsDataURL(file2);
    }
  }

  async createToken(data) {
    // if (this.mainComponent.userWalletAddress === this.connectService.account) {
    //   // comment this line
    //   this.utility.startLoader();
    //   const tokenId = await this.connectService.nextTokenId(); // comment this line
    //   // const tokenId = "DemoTokenId"; // un-comment this line

    //   const resp = await this.connectService.createToken(
    //     data.amount,
    //     data.uri,
    //     data.data
    //   );
    //   this.utility.stopLoader();

    // if (resp) {
    this.utility.startLoader();
    this.saveToken({
      numberOfToken: data.amount,
      agreement: data.agreement,
      credit_Enhancement: data.credit_Enhancement,
      guarantee: data.guarantee,
      address: this.mainComponent.userWalletAddress,
      description: data.data,
      tokenId: "",
      user: this.userId,
      date_of_Expiration: formatDate(new Date(data.date_of_Expiration),"MM-dd-yyyy","en"),
      days: data.days,
      renewal: data.renewal,
    });
    // }
    // comment next 6 line
    // } else {
    //   this.utility.showErrorAlert(
    //     "Error",
    //     "Please choose authorized metamask account in order to approve this request"
    //   );
    // }
  }

  saveToken(data) {
    this.coinService.createCoin(data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert("Success", "Token Created Successfully");
        this.router.navigate(["/app/list-token"]);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
}
