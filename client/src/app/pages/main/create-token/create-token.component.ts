import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, ConnectService, CoinService } from '../../../_services';
import { Router } from '@angular/router';
import { MainComponent } from '../main.component';
const IpfsHttpClient = require('ipfs-http-client');
const ipfs = new IpfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

@Component({
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css'],
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
    this.utility.updatePageSEO('Issue Token | NFT', 'Issue Token | NFT');
  }

  form: FormGroup;
  userId = JSON.parse(localStorage.getItem('user'))['id'];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [null, Validators.required],
      uri: [null, Validators.required],
      data: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  upload() {
    const file = (<HTMLInputElement>document.getElementById('document'))
      .files[0];
    var self = this;
    const preview = document.getElementById('preview');
    const reader = new FileReader();
    let byteArray;

    reader.addEventListener(
      'loadend',
      async function () {
        // convert image file to base64 string

        byteArray = self.convertDataURIToBinary(reader.result);
        self.utility.startLoader('Uploading document....');
        var result = await ipfs.add(byteArray);
        self.utility.startLoader(
          'Document uploaded sucessfully. Please wait...'
        );
        self.utility.startLoader('Data encryption in progress. Please wait...');
        var fianalJSON = self.form.value;
        fianalJSON['uri'] = result['path'];

        await self.createToken(fianalJSON);
      
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async createToken(data) {
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      const tokenId = await this.connectService.nextTokenId();

      const resp = await this.connectService.createToken(data.amount, data.uri, data.data);
      this.utility.stopLoader();

      if (resp) {
        this.utility.startLoader()
        this.saveToken({
          numberOfToken: data.amount,
          uri: data.uri,
          address: this.mainComponent.userWalletAddress,
          description: data.data,
          tokenId: tokenId,
          user: this.userId,
        });
      }
    } else {
      this.utility.showErrorAlert(
        'Error',
        'Please choose authorized metamask account in order to approve this request'
      );
    }
  }

  saveToken(data) {
    this.coinService.createCoin(data).subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert('Success', 'Token Created Successfully');
        this.router.navigate(['/app/list-token']);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
