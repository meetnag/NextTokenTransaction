import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TransferService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all transfer list role wise
  getTransfers() {
    return this.http.get(`${this.apiUrl}transfers/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  findTransfers(transferBody: Object) {
    return this.http.post(`${this.apiUrl}transfers/find`, transferBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get transfer by id
  getTransferById(transferId: String) {
    return this.http.get(`${this.apiUrl}transfers/${transferId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New Transfer
  createTransfer(transferBody: Object) {
    return this.http.post(`${this.apiUrl}transfers/`, transferBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update Transfer
  updateTransfer(transferId: String, userBody: Object) {
    return this.http
      .patch(`${this.apiUrl}transfers/${transferId}`, userBody)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Delete Transfer Request
  deleteTransferRequest(transferId: String) {
    return this.http.delete(`${this.apiUrl}transfers/${transferId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
