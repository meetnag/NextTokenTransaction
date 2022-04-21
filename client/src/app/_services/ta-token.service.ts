import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TaTokenService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all TaToken list role wise
  getTaTokens() {
    return this.http.get(`${this.apiUrl}taToken/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get TaToken by id
  getCoinById(coinId: String) {
    return this.http.get(`${this.apiUrl}taToken/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New TaToken
  createTaToken(coinBody: Object) {
    return this.http.post(`${this.apiUrl}taToken/`, coinBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update TaToken
  updateTaToken(coinId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}taToken/${coinId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Delete TaToken Request
  deleteTaTokenRequest(coinId: String) {
    return this.http.delete(`${this.apiUrl}taToken/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // approve TaToken
  approveTaToken(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}taToken/Approve/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Get coin by token id
  getCoinByTokenId(tokenId: String) {
    return this.http.get(`${this.apiUrl}taToken/getTaToken/${tokenId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
