import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
const Web3 = require("web3");
const ethers = require("ethers");
declare let require: any;
declare let window: any;
const tokenAbi = require("../contract/abis.json");

@Injectable({
  providedIn: "root",
})
export class ConnectService {
  public account: any = null;
  private readonly web3: any;
  private enable: any;
  private contract: any;

  constructor() {
    if (window.ethereum === undefined) {
      alert("Non-Ethereum browser detected. Install MetaMask");
    } else {
      if (typeof window.web3 !== "undefined") {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider(
          "https://kovan.infura.io/v3/f99366737d854f5e91ab29dad087fcd5"
        );
      }

      console.log("transfer.service :: constructor :: window.ethereum");
      window.web3 = new Web3(window.ethereum);
      console.log("transfer.service :: constructor :: this.web3");
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
      console.log(this.enable);
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        enable = await window.ethereum.enable();

        if (enable) {
          this.getUserBalance();
          this.connectContract();
        }
      }
    });
    return Promise.resolve(enable);
  }

  public async convertJSONtoHEX(value) {
    // console.log("convertJSONtoHEX ===value==> ",value)
    return window.web3.utils.toHex(value); // comment this line
    // return value; // un-comment this line
  }

  public async connectContract() {
    this.contract = await new window.web3.eth.Contract(
      tokenAbi,
      environment.CONTRACT_ADDRESS
    );

    console.log("======> this.contract <====", this.contract);
  }

  public async createPropertyNFTs(id, acres, byteData) {
    // var contract = await this.connectContract();
    var receipt = await this.contract.methods
      .createToken([id], [acres], byteData)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return receipt;
  }

  private async getAccount(): Promise<any> {
    console.log("transfer.service :: getAccount :: start");
    if (this.account == null) {
      this.account = (await new Promise((resolve, reject) => {
        console.log("transfer.service :: getAccount :: eth");
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log("transfer.service :: getAccount: retAccount");
          console.log(retAccount);
          console.log(err);
          if (retAccount.length > 0) {
            console.log("=====> account id <=====", retAccount[0]);
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert("transfer.service :: getAccount :: no accounts found.");
            reject("No accounts found.");
          }
          if (err != null) {
            alert("transfer.service :: getAccount :: error retrieving account");
            reject("Error retrieving account");
          }
        });
      })) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log("transfer.service :: getUserBalance :: account");
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function (err, balance) {
        console.log("transfer.service :: getUserBalance :: getBalance");
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance,
          };
          console.log(
            "transfer.service :: getUserBalance :: getBalance :: retVal"
          );
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({ account: "error", balance: 0 });
        }
      });
    }) as Promise<any>;
  }

  public async setManager(address) {
    await this.connectContract();
    var response = await this.contract.methods
      .setManger(address)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  public async setOwner(address) {
    await this.connectContract();
    var response = await this.contract.methods
      .setOwner(address)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  // comment all line in this function then un-comment list one line
  public async createToken(amount, uri, hex) {
    console.log("====> call create token  1<====");
    await this.connectContract();
    console.log("==createToken=====> passs connectContract <======");

    var hexData = await this.convertJSONtoHEX(hex);
    // var hexData = hex;
    console.log(
      "==createToken=====> passs convertJSONtoHEX <====hexData==",
      hexData
    );
    console.log(
      "==createToken=====> before this.account <====this.account==",
      this.account
    );
    var response = await this.contract.methods
      .createToken(amount, uri, hexData)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });
    console.log("=========createToken========> response <========", response);
    return response;
    // return true; // un-comment this line
  }

  public async setApprovedByManager() {
    await this.connectContract();
    var response = await this.contract.methods
      .setApprovedByManager()
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  public async setApprovedByowner() {
    await this.connectContract();
    var response = await this.contract.methods
      .setApprovedByowner()
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  public async safeTransferFrom(to, tokenId, tokenAmt, data) {
    await this.connectContract();
    var hexData = await this.convertJSONtoHEX(data);
    var response = await this.contract.methods
      .safeTransferFrom(this.account, to, tokenId, tokenAmt, hexData)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  public async burnToken(address, tokenId, tokenAmt) {
    await this.connectContract();
    var response = await this.contract.methods
      .burnToken(address, tokenId, tokenAmt)
      .send({ from: this.account })
      .once("receipt", (receipt) => {
        console.log("receipt==========", receipt);
      })
      .catch((error) => {
        console.log("error==========", error);
      });

    return response;
  }

  public async nextTokenId() {
    console.log("====> call next TokenId <=====");
    await this.connectContract();
    console.log("===pass=> call next TokenId <=====");
    var response = await this.contract.methods.nextTokenId().call();
    console.log("======> nextTokenId <===response=", response);
    return response;
  }

  public async balanceOf(address, tokenId) {
    await this.connectContract();
    var response = await this.contract.methods
      .balanceOf(address, tokenId)
      .call();
    return response;
  }
}
