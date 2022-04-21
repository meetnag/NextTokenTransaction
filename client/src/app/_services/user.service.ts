import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get all user list role wise
  getUsers() {
    return this.http.get(`${this.apiUrl}users/all`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get user by id
  getUserById(userId: String) {
    return this.http.get(`${this.apiUrl}users/${userId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add New User
  createUser(userBody: Object) {
    return this.http.post(`${this.apiUrl}users/`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update User
  updateUser(userId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}users/${userId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Update password
  updatePassword(userId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}users/update-password/${userId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Delete User
  deleteUser(userId: String) {
    return this.http.delete(`${this.apiUrl}users/${userId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
