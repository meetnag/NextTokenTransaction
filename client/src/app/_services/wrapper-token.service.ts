import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WrapperTokenService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all WrapperToken list role wise
  getWrapperTokens() {
    return this.http.get(`${this.apiUrl}wrapperToken/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get WrapperToken by id
  getCoinById(coinId: String) {
    return this.http.get(`${this.apiUrl}wrapperToken/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New WrapperToken
  createWrapperToken(coinBody: Object) {
    return this.http.post(`${this.apiUrl}wrapperToken/`, coinBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update WrapperToken
  updateWrapperToken(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}wrapperToken/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  updateTaTokenDocument(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}wrapperToken/updateDocument/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Delete WrapperToken Request
  deleteWrapperTokenRequest(coinId: String) {
    return this.http.delete(`${this.apiUrl}wrapperToken/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // approve WrapperToken
  approveWrapperToken(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}wrapperToken/Approve/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Get coin by token id
  getCoinByTokenId(tokenId: String) {
    return this.http
      .get(`${this.apiUrl}wrapperToken/getWrapperToken/${tokenId}`)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
