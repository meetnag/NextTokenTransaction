import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  UtilityService,
  TaTokenService,
  ConnectService,
} from "../../../_services";
import { MainComponent } from "../main.component";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
const IpfsHttpClient = require("ipfs-http-client");

const ipfs = new IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

@Component({
  selector: "app-ta-tokenization",
  templateUrl: "./ta-tokenization.component.html",
  styleUrls: ["./ta-tokenization.component.css"],
})
export class TaTokenizationComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mainComponent: MainComponent,
    private connectService: ConnectService,
    private invoiceService: TaTokenService
  ) {
    this.utility.updatePageSEO(
      "TA Tokenization | NFT",
      "TA Tokenization | NFT"
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
      tokens: [1, Validators.required],
      agreement1: [null, Validators.required],
      agreement2: [null, Validators.required],
      agreement3: [null, Validators.required],
      agreement4: [null, Validators.required],
      agreement5: [null],
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

    let fianalJSON = {
      invoiceNo: self.form.value.invoiceNo,
      tokens: self.form.value.tokens,
      agreement: [],
      data: self.form.value.data,
    }
    let fileObject = {
      id:'',
      name:'',
      flag:0
    }
    // var fianalJSON = self.form.value;
    fileObject["name"] = file.name;

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

        fileObject["id"] = result["path"];
        fianalJSON["agreement"].push(fileObject);
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

      console.log("========> file1 <====", file1);
    console.log("========> file1 <====", file1.name);
    var self = this;
    const reader = new FileReader();
    let byteArray1;

    let fileObject = {
      id:'',
      name:'',
      flag:0
    }
    fileObject["name"] = file1.name;
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
        fianalJSON["id"] = result1["path"];
        fianalJSON["agreement"].push(fileObject);
        await self.uploadfile2(fianalJSON);
      },
      false
    );

    if (file1) {
      await reader.readAsDataURL(file1);
    }
  }

  async uploadfile2(fianalJSON) {
    const file2 = (<HTMLInputElement>document.getElementById("document2"))
      .files[0];

    // console.log("========> file2 <====", file2);
    // console.log("========> file2 <====", file2.name);
    var self = this;
    const reader = new FileReader();
    let byteArray2;
    let fileObject = {
      id:'',
      name:'',
      flag:0
    }

    fileObject["name"] = file2.name;
    await reader.addEventListener(
      "loadend",
      async function () {
        // convert image file to base64 string

        byteArray2 = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....2");
        var result2 = await ipfs.add(byteArray2);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        console.log("=======> agreement3_id <=====", result2["path"]);
        fileObject["id"] = result2["path"];
        fianalJSON["agreement"].push(fileObject);
        await self.uploadfile3(fianalJSON);
      },
      false
    );

    if (file2) {
      await reader.readAsDataURL(file2);
    }
  }
  async uploadfile3(fianalJSON) {
    const file3 = (<HTMLInputElement>document.getElementById("document3"))
      .files[0];

    // console.log("========> file2 <====", file2);
    // console.log("========> file2 <====", file2.name);
    var self = this;
    const reader = new FileReader();
    let byteArray2;
    let fileObject = {
      id:'',
      name:'',
      flag:0
    }

    fileObject["name"] = file3.name;
    await reader.addEventListener(
      "loadend",
      async function () {
        // convert image file to base64 string

        byteArray2 = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader("Uploading document....3");
        var result2 = await ipfs.add(byteArray2);
        self.utility.startLoader(
          "Document uploaded sucessfully. Please wait..."
        );
        self.utility.startLoader("Data encryption in progress. Please wait...");
        console.log("=======> agreement4_id <=====", result2["path"]);
        fileObject["id"] = result2["path"];
        fianalJSON["agreement"].push(fileObject);
        await self.uploadfile4(fianalJSON);
      },
      false
    );

    if (file3) {
      await reader.readAsDataURL(file3);
    }
  }
  async uploadfile4(fianalJSON) {
    const value = this.form.value.agreement5;
    if (value) {
      const file4 = (<HTMLInputElement>document.getElementById("document4"))
        .files[0];

      // console.log("========> file2 <====", file2);
      // console.log("========> file2 <====", file2.name);
      var self = this;
      const reader = new FileReader();
      let byteArray2;
      let fileObject = {
        id:'',
        name:'',
        flag:0
      }

      fileObject["name"] = file4.name;
      await reader.addEventListener(
        "loadend",
        async function () {
          // convert image file to base64 string

          byteArray2 = self.convertDataURIToBinary(reader.result);
          self.utility.startLoader("Uploading document....4");
          var result2 = await ipfs.add(byteArray2);
          self.utility.startLoader(
            "Document uploaded sucessfully. Please wait..."
          );
          self.utility.startLoader(
            "Data encryption in progress. Please wait..."
          );
          console.log("=======> agreement5_id <=====", result2["path"]);
          fileObject["id"] = result2["path"];
          fianalJSON["agreement"].push(fileObject);
          await self.createToken(fianalJSON);
        },
        false
      );

      if (file4) {
        await reader.readAsDataURL(file4);
      }
    } else {
      fianalJSON["agreement5_id"] = "";
      await this.createToken(fianalJSON);
    }
  }

  async createToken(data) {
    console.log("===============createToken======> data <=====", data);
    this.utility.startLoader();

    console.log("======> upload iteam <==22222222222=", data);
    console.log(
      "======> upload this.mainComponent.userWalletAddress <===",
      this.mainComponent.userWalletAddress
    );
    console.log(
      "======> upload this.connectService.account <===",
      this.connectService.account
    );
    // if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      // const tokenId = await this.connectService.nextTokenId();
      // console.log("========> token id <=====", tokenId);
      let agr = "";
      for (let i = 0; i < data.agreement.length; i++) {
        const element = data.agreement[i].name;
        agr += `${element}  `
      }
      console.log("======upload===> agr <===========", agr);
      // const agr =
      //   data.agreement1 +
      //   "   " +
      //   data.agreement2 +
      //   "   " +
      //   data.agreement3 +
      //   "  " + 
      //   data.agreement4;
      // const resp = await this.connectService.createToken(
      //   data.tokens, //numberOfToken,
      //   agr,
      //   data.data
      // );
      const resp = true;
      const tokenId = 5241;
      console.log("======upload===> resp <===========", resp);
      if (resp) {
        this.saveToken({
          user: this.userId,
          tokenId: tokenId,
          invoiceNo: data.invoiceNo,
          tokens: data.tokens,
          agreement1: data.agreement,
          description: data.data,
        });
       
      }
    // } else {
    //   this.utility.showErrorAlert(
    //     "Error",
    //     "Please choose authorized metamask account in order to approve this request"
    //   );
    // }
  }

  saveToken(data) {
    this.invoiceService.createTaToken(data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert(
          "Success",
          "TA Tokens Request Created Successfully"
        );
        this.router.navigate(["/app/list-of-ta-Tokenization"]);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
}
