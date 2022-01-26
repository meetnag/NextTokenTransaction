import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AuthenticationService,
  UtilityService,
  ConnectService,
} from "../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
  providers: [ConnectService],
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.utility.updatePageSEO("Login | NFT", "Login | NFT", "", "");
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: [null, Validators.required],
    });

    // this.getAccountAndBalance()
  }

  get getForm() {
    return this.form.controls;
  }

  loginAction() {
    if (this.form.valid) {
      this.utility.startLoader();
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (res) => {
            this.utility.stopLoader();
            console.log("===> res <====", res);
            this.utility.showSuccessAlert("Success!", "Logged in successfully");
            if (res.user.role === "internal" || res.user.role === "external") {
              this.router.navigate(["app/list-token"]);
            } else if (res.user.role === "vendor") {
              this.router.navigate(["app/accept-payment"]);
            } else {
              // this.router.navigate(["app/issue-token"]);
              this.router.navigate(["app/invoice-Tokenization"]);
            }
          },
          (error) => {
            this.utility.stopLoader();
            this.utility.showErrorAlert("Error", error);
          }
        );
    }
  }

  // getAccountAndBalance = () => {
  //   const that = this;
  //   this.connectService.getUserBalance().
  //   then(function(retAccount: any) {

  //     console.log(retAccount);
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }
}
