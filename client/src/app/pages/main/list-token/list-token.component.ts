import { Component, OnInit } from "@angular/core";
import {
  UtilityService,
  CoinService,
  ConnectService,
} from "../../../_services";
import { MainComponent } from "../main.component";

@Component({
  templateUrl: "./list-token.component.html",
  styleUrls: ["./list-token.component.css"],
})
export class ListTokenComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private coinService: CoinService,
    private connectService: ConnectService,
    private mainComponent: MainComponent
  ) {
    this.utility.updatePageSEO("Token List | NFT", "Token List | NFT");
  }

  user: String = JSON.parse(localStorage.getItem("user"));
  public coinList: any = [];

  ngOnInit(): void {
    this.getTokenList();
  }

  getTokenList() {
    this.utility.startLoader();
    this.coinService.getCoins().subscribe(
      (res) => {
        this.coinList = res;
        this.utility.stopLoaderWithTableReload();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }

  approveInternal(iteam) {
    this.utility.startLoader();
    this.coinService.approveCoin(iteam.id, { internal_approver: 1 }).subscribe(
      (res) => {
        this.getTokenList();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
  rejectInternal(iteam) {
    this.utility.startLoader();
    this.coinService.approveCoin(iteam.id, { internal_approver: 0 }).subscribe(
      (res) => {
        this.getTokenList();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
  approveExternal(iteam) {
    this.utility.startLoader();
    this.coinService.approveCoin(iteam.id, { external_signer: 1 }).subscribe(
      (res) => {
        this.getTokenList();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert("Error", error);
      }
    );
  }
  rejectExternal(iteam) {
    this.utility.startLoader();
    this.coinService.approveCoin(iteam.id, { external_signer: 0 }).subscribe(
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
    console.log("======> upload iteam <==22222222222=",iteam)
    console.log("======> upload this.mainComponent.userWalletAddress <===",this.mainComponent.userWalletAddress)
    console.log("======> upload this.connectService.account <===",this.connectService.account)
    if (this.mainComponent.userWalletAddress === this.connectService.account) {
      this.utility.startLoader();
      const tokenId = await this.connectService.nextTokenId();
      console.log("========> token id <=====", tokenId);
      
      const resp = await this.connectService.createToken(
        iteam.numberOfToken,
        iteam.agreement,
        iteam.description
      );

      console.log("======upload===> resp <===========",resp)
      if (resp) {
        this.coinService.updateCoin(iteam.id, { tokenId: tokenId }).subscribe(
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
}
