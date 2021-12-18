import { Component, OnInit } from "@angular/core";
import { UtilityService, CoinService } from "../../../_services";

@Component({
  templateUrl: "./list-token.component.html",
  styleUrls: ["./list-token.component.css"],
})
export class ListTokenComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private coinService: CoinService
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
}
