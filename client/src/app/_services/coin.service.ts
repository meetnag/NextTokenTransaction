import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoinService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all coin list role wise
  getCoins() {
    return this.http.get(`${this.apiUrl}coins/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get coin by id
  getCoinById(coinId: String) {
    return this.http.get(`${this.apiUrl}coins/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New Coin
  createCoin(coinBody: Object) {
    return this.http.post(`${this.apiUrl}coins/`, coinBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update Coin
  updateCoin(coinId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}coins/${coinId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Delete Coin Request
  deleteCoinRequest(coinId: String) {
    return this.http.delete(`${this.apiUrl}coins/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // approve Coin
  approveCoin(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}coins/Approve/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

   // Get coin by token id
   getCoinByTokenId(tokenId: String) {
    return this.http.get(`${this.apiUrl}coins/getCoins/${tokenId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
