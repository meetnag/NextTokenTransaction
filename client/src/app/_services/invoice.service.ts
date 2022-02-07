import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all Invoice list role wise
  getInvoices() {
    return this.http.get(`${this.apiUrl}invoice/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get Invoice by id
  getCoinById(coinId: String) {
    return this.http.get(`${this.apiUrl}invoice/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New Invoice
  createInvoice(coinBody: Object) {
    return this.http.post(`${this.apiUrl}invoice/`, coinBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update Invoice
  updateInvoice(coinId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}invoice/${coinId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Delete Invoice Request
  deleteInvoiceRequest(coinId: String) {
    return this.http.delete(`${this.apiUrl}invoice/${coinId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // approve Invoice
  approveInvoice(coinId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}invoice/Approve/${coinId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Get coin by token id
  getCoinByTokenId(tokenId: String) {
    return this.http.get(`${this.apiUrl}invoice/getInvoice/${tokenId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
