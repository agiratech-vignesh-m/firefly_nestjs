import FireFly from "@hyperledger/firefly-sdk";
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { FireFlyListener } from "./listener.service";

const SUB_NAME = "new-sub";

@Injectable()

export class FireflyService implements OnModuleInit {
  private readonly firefly: FireFly;
  constructor(
    private readonly configService: ConfigService,
    private readonly listener: FireFlyListener
  )  {
    this.firefly = new FireFly({
      host: "http://127.0.0.1:5000",
      // host: "http://atic-dc-ff.blockchaincloudapps.com:5000",
      // host: "http://ehub-dc-ff.blockchaincloudapps.com:5000",
      // host: this.configService.get<string>("fireflyHost"),
      namespace: "default",

    });
  }

  async onModuleInit() {
    this.listener.listenEvents();
    // this.listen();
  }

  // async subcribe() {
  //   try {
  //     const sub = await this.firefly.replaceSubscription({
  //       name: SUB_NAME, 
  //       options: {
  //             firstEvent: "oldest"
  //           },
  //       })
  //   } catch (err) {
  //     console.log("err", err);
  //     throw new Error(err?.message);
  //   }
  // }
  
  // async listen() {
  //   try {
  //     // const eventsList = [
  //     //   "DriverRegistered",
  //     //   "EndDateUpdate",
  //     //   "CouponCreated",
  //     //   "Redeemed",
  //     //   "DataCredentialized",
  //     //   "DataCredentialEdited",
  //     // ];

  //     this.firefly.listen(SUB_NAME, (socket, event) => {
  //       console.log("socket", socket);
  //       console.log("eventttt", event.type);
  //       console.log("Status --- >", event?.blockchainEvent?.output?._status);
  //     });
  //   } catch (err) {
  //     console.log("err", err);
  //     throw new Error(err?.message);
  //   }
  // }
  // const addSub = await this.firefly.replaceSubscription({
  //   name:"new-sub",
  //   options: {
  //     firstEvent: "oldest"
  //   },
  // })

  public async registerDriver() {
    try {
      const web3Variables = this.configService.get<any>("web3");
      const contracts = this.configService.get<any>("contracts");
      const api = this.configService.get<any>("swaggerApi");
      const driverDetails = {
        _driverAddress: "0xe4Ebe4D17841679Bd208655dF794DdD9dc6296c3",
        _licenseNumber:"123456783",
        _ipfsUrl: "qazwsxedcq"

      };
      const addDriver = await this.firefly.invokeContractAPI(
        api.credential,
        "driverCredential",
        {
          input: driverDetails,
          key: web3Variables.publicKey,
          location: contracts.credentialingContract,
        }
      );
      console.log("addDriver", addDriver);
      return addDriver;
    } catch (err) {
      console.log("err", err);
    }
  }

  public async createCoupon() {
    try {
      const web3Variables = this.configService.get<any>("web3");
      const contracts = this.configService.get<any>("contracts");
      const api = this.configService.get<any>("swaggerApi");

        const createOption = {
        _end: "1686574312",
        _couponId: "GET1000",
        _ipfsUrl: "QmdnYyVhE1S5nsSTXdS3vVwvg92cWmSHyXkCYSEPX2WJSV",
        _start: "1686567112"
      };
      const add = await this.firefly.invokeContractAPI(
        api.coupon,
        "createCoupon",
        {
          input: createOption,
          // Local Coupon details
          key: web3Variables.publicKey,
          location: contracts.couponContract,
        }
      );
      // "Register",
      //   "registerDriver",
      //   {
      //     input: {
      //       "_newDriver": "0x01bee19Bb2f856a33FC265F387Babd159071c689"
      //     },
      //     key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
      //     location: "0x0749D72604579D15dAC7178ffE03a2e5F9308f48",
      //     // options: {test: "test"}
      //   }
      // );
      console.log("add", add);
      return add;
      // const createOption = {
      //   _end: "1682966780",
      //   _id: "12345671",
      //   _ipfsUrl: "QmdnYyVhE1S5nsSTXdS3vVwvg92cWmSHyXkCYSEPX2WJSV",
      //   _start: "1682666680",
      // };
      // const create = await this.firefly.invokeContractAPI(
      //   "Coupon3",
      //   "createCoupon",
      //   {
      //     input: createOption,
      //     key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
      //     location: "0x00b76c0fCdB99dB7f7B03139781162D644d7015D",
      //     // options: {test: "test"}
      //   }
      // );
      // console.log(create.input.errors.map(data => console.log(data.message)))
      // console.log("createed", create);

      // const redeemed = await this.firefly.invokeContractAPI(
      //   "Coupon3",
      //   "redeemCoupon",
      //   {
      //     input: { _id: "12345671" },
      //     key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
      //     location: "0x00b76c0fCdB99dB7f7B03139781162D644d7015D",
      //   }
      // );
      // console.log("redeemed", redeemed);
    } catch (err) {
      console.log("err", err);
    }
  }

  public async redeemCoupon() {
    try {
      const redeem = {
        _driverAddress: "0x18B169B811af233cBea0C44F03D0b1e42E8f2DB8",
        _id: "1",
      };
      const redeemed = await this.firefly.invokeContractAPI(
        "newCoupon",
        "redeemCoupon",
        {
          input: redeem,
          key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
          location: "0x6d5779ED588b6cDA8612fB60a50332c6DeEe6103",
        }
      );
      console.log("redeemed", redeemed);
    } catch (err) {
      console.log("err", err);
    }
  }

  public async getDriverDetails() {
    try {
      const getDetails = {
        // _driverAddress: "0x18B169B811af233cBea0C44F03D0b1e42E8f2DB8"
      }

      const getIds = await this.firefly.queryContractAPI(
        "reg",
        // "getAllAdmins",
        // "getAllDrivers",
        // "getNoOfDrivers",
        // "isDriverRegistered",
        "owner",
       
        {
          input: getDetails,
          
          key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
          location: "0x72ea99F1886737200f5a61fdA60a75c6e9794058",
          // options: {test: "test"}
        }
      );
      
      console.log("getAdmin", getIds);
    } catch (err) {
      console.log("err", err?.message);
    }
  }

  public async getCouponDetails() {
    try {
      const getoption = {
        _values: "10",
        // _driverAddress: "0x01bee19Bb2f856a33FC265F387Babd159071c689",
        // _id : 1
        // owner: "0xaCe8B10A891c8465Ed2C465c93d2DF348B26CE62"
        _ad: "0x18B169B811af233cBea0C44F03D0b1e42E8f2DB8",
        // tokenId: 2
        _couponId: 1
      };

      const getIds = await this.firefly.queryContractAPI(
        "newCoupon",
        // "allAdminAddresses",
        // "allCouponIds",
        // "balanceOf",
        // "couponAndRelatedTokenIds",
        // "couponCreatedOrNotCreatedStatus",
        // "couponsPerAddress",
        // "ownerOf",
        // "totalCouponsCount",
        // "verifyDriverAd",
        // "viewAllCreatedTokens",
        "viewCouponStatus",
        // "viewCouponValidityToUser",
        {
          input: getoption,
          // {
          //   // "_couponId": 1
          //   // "owner": "0x01bee19Bb2f856a33FC265F387Babd159071c689"
          //   // "id": "01180e6b-cb59-4107-a84e-a27a2f2ced9f"
            
          // },
          key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
          location: "0x9dafB7612b3e3F05A4E2FA30429ebADB13cC2Fd8",
          // options: {test: "test"}
        }
      );
      // "Register",
      //   "getAllDrivers",
      //   {
      //     input: {
      //       // "id": "12a22480-6442-4da6-8041-c096a2c05c1b"
      //       // "_newDriver": "0x18B169B811af233cBea0C44F03D0b1e42E8f2DB8"
      //     },
      //     key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
      //     location: "0x0749D72604579D15dAC7178ffE03a2e5F9308f48",
      //     // options: {test: "test"}
      //   }
      // );
      console.log("getIds", getIds);

      // const redeemed = await this.firefly.invokeContractAPI(
      //   "Coupon3",
      //   "redeemCoupon",
      //   {
      //     input: { _id: "12345671" },
      //     key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
      //     location: "0x00b76c0fCdB99dB7f7B03139781162D644d7015D",
      //   }
      // );
      // console.log("redeemed", redeemed);
    } catch (err) {
      console.log("err", err?.message);
    }
  }

  public async driverCredential() {
    try {
      const credential = {
        _driverAddress: "0x01bee19Bb2f856a33FC265F387Babd159071c689",
        _ipfsUrl : "12345",
      };
      const approve = await this.firefly.invokeContractAPI(
        "newCredential",
        "credentialize",
        {
          input: credential,
          key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
          location: "0xae1941918E518085a9895eA6094Ec2aaBe09aD74",
        }
      );
      console.log("approve", approve);
    } catch (err) {
      console.log("err", err);
    }
  }

  public async getCredentialDetails() {
    try {
      const getDetails = {
        // _driverAddress: "0x18B169B811af233cBea0C44F03D0b1e42E8f2DB8"
        _packedData: "0xc3829fbd7ab415f3a831f840d5cc245f9da2af127c3dd5c4e029930480df4141"
      }

      const getCredentialDetails = await this.firefly.queryContractAPI(
        "newCredential",
        "viewCredentializedData",
       
        {
          input: getDetails,
          
          key: "0xace8b10a891c8465ed2c465c93d2df348b26ce62",
          location: "0xae1941918E518085a9895eA6094Ec2aaBe09aD74",
          // options: {test: "test"}
        }
      );
      
      console.log("getCredentialDetails", getCredentialDetails);
    } catch (err) {
      console.log("err", err?.message);
    }
  }

}

