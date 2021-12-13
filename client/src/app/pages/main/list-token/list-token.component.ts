import { Component, OnInit } from '@angular/core';
import { UtilityService, CoinService } from '../../../_services';

@Component({
  templateUrl: './list-token.component.html',
  styleUrls: ['./list-token.component.css'],
})
export class ListTokenComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private coinService: CoinService
  ) {
    this.utility.updatePageSEO('Token List | NFT', 'Token List | NFT');
  }

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
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
