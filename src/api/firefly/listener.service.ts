import FireFly, {
  FireFlyEnrichedEvent,
  FireFlyEventDelivery,
  FireFlyEventResponse,
} from "@hyperledger/firefly-sdk";
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { fireFlyEvents } from 'src/utils/constants.utils';
import { SocketGateway } from "../socket/socket.gateway";

@Injectable()
export class FireFlyListener {
  private firefly: FireFly;
  constructor(
    private readonly configService: ConfigService,
    private readonly socketGateway: SocketGateway,
  ) {
    this.firefly = new FireFly({
      host: "http://localhost:5000",
    });
    this.firefly.replaceSubscription({
      name: "ehub-dc-listener",
    });
  }

  
  // @InjectRepository(User)
  // private readonly userRepository: Repository<User>;

  public async listenEvents() {
    try {
      this.firefly.listen("ehub-dc-listener", (socket, event) => {
        switch (event.type) {
          case "blockchain_event_received":
            console.log("Transaction Received Final event", event);
            this.handleReceivedFinalEvent(event);

          case "blockchain_invoke_op_succeeded":
            // console.log("Transaction Success event", event);
            this.handleSuccessEvent(event);

          case "blockchain_invoke_op_failed":
            // console.log("Transaction Failed event", event);
            this.handleFailedEvent(event);

          case "transaction_submitted":
            // console.log("Transaction Submitted event", event);
            this.handleSubmittedEvent(event);

          default:
        }
      });
    } catch (err) {
      console
      .log("err", err);
    }
  }

  public async handleReceivedFinalEvent(event: FireFlyEventDelivery) {
    try {
      // if (event.blockchainEvent.name = fireFlyEvents.COUPON_CREATED) {
      //       this.socketGateway.emitCouponCreated({
      //       couponId: event.blockchainEvent.output?._tokenId,
      //       status: "Success",
      //       message: "Coupon created",
      //     });
      // }
      switch (event.blockchainEvent.name) {
        case fireFlyEvents.COUPON_CREATED:
            this.socketGateway.emitCouponCreated({
            couponId: event.blockchainEvent.output?._tokenId,
            status: "Success",
            message: "Coupon created",
          });
        case fireFlyEvents.DRIVER_CREDENTIALIZED:
        // await this.entraHelperService.updateRegistrationDetails({
        //   address: event.blockchainEvent.output._driver
        // })
        // await this.entraHelperService.updateEntraDetails({
        //   address: event.blockchainEvent.output._driver
        // })
        this.socketGateway.emitRegistered(
          {
            driverAddress: event.blockchainEvent.output?._driver,
            status: "success",
            message: "Driver credentialized",
          },
          // event.blockchainEvent.output?._driver
        );
        case fireFlyEvents.COUPON_REDEEMED:
          this.socketGateway.emitCouponRedeem(
            {
              coupon: event.blockchainEvent.output?._tokenId,
              status: "success",
              message: "Coupon redeemed",
            },
          );
        case fireFlyEvents.COUPON_END_DATE_UPDATE:
          this.socketGateway.emitUpdatedCouponEndDate({
            coupon_id: event.blockchainEvent.output?._couponId,
            status: "success",
            message: "Coupon end date updated",
          });  
        case fireFlyEvents.UPDATED_COUPON_META_INFO:
          this.socketGateway.emitUpdatedCouponMetaInfo({
            coupon_id: event.blockchainEvent.output?._couponId,
            status: "success",
            message: "Coupon meta info updated",
          }); 
        case fireFlyEvents.UPDATED_COMPLETE_COUPON_DETAILS:
          this.socketGateway.emitDriverCredentialAndEndDateUpdated({
            coupon_id: event.blockchainEvent.output?._couponId,
            status: "success",
            message: "Coupon meta info and end date updated",
          });  
        case fireFlyEvents.DRIVER_CREDENTIAL_EDITED:
          this.socketGateway.emitDriverCredentialUpdated(
            {
              wallet: event.blockchainEvent.output?._driver,
              message: "Driver credential edited",
              status: "success",
            },
            // event.blockchainEvent.output?._driver
          );
        case fireFlyEvents.DRIVER_LICENSE_EDITED:
          this.socketGateway.emitLicenseUpdated(
            {
              wallet: event.blockchainEvent.output?._driverAddress,
              status: "success",
              message: "Driver registered",
            },
            // event.blockchainEvent.output?._driverAddress
          );
        case fireFlyEvents.LICENSE_AND_CREDENTIAL_EDITED:
          this.socketGateway.emitDriverCredentialAndEndDateUpdated(
            {
              wallet: event.blockchainEvent.output?._driverAddress,
              status: "success",
              message: "Driver registered",
            },
            // event.blockchainEvent.output?._driverAddress
          );  
        case fireFlyEvents.COUPON_REACTIVATED:
          this.socketGateway.emitCouponReactivated(
            {
              wallet: event.blockchainEvent.output?._driverAddress,
              status: "success",
              message: "Driver registered",
            },
            // event.blockchainEvent.output?._driverAddress
          ); 
          
        case fireFlyEvents.COUPON_DEACTIVATED:
          this.socketGateway.emitCouponDeactivated(
            {
              wallet: event.blockchainEvent.output?._driverAddress,
              status: "success",
              message: "Driver registered",
            },
            // event.blockchainEvent.output?._driverAddress
          );     
        default:
          console.log("Other event");
      }
    } catch (err) {
      console.log("err", err);
    }
  }


  public async handleSuccessEvent(event: FireFlyEnrichedEvent) {
    try {
      // console.log("Success handler");
    } catch (err) {
      console.log("err", err);
    }
  }


  public async handleFailedEvent(event: FireFlyEnrichedEvent) {
    try {
      // console.log("Success handler");
    } catch (err) {
      console.log("err", err);
    }
  }


  public async handleSubmittedEvent(event: FireFlyEnrichedEvent) {
    try {
      // console.log("Success handler");
    } catch (err) {
      console.log("err", err);
    }
  }

  
  // public async listenEvents() {
  //   try {
  //     this.firefly.listen("ehub-dc-listener", (socket, event) => {

  //       console.log("Evets received", event)
  //       // switch (event.type) {
  //       //   case "blockchain_event_received":
  //       //     console.log("Transaction Received Final event", event);
  //       //     this.handleReceivedFinalEvent(event);

  //         // case "blockchain_invoke_op_succeeded":
  //         //   // console.log("Transaction Success event", event);
  //         //   this.handleSuccessEvent(event);

  //         // case "blockchain_invoke_op_failed":
  //         //   // console.log("Transaction Failed event", event);
  //         //   this.handleFailedEvent(event);

  //         // case "transaction_submitted":
  //         //   // console.log("Transaction Submitted event", event);
  //         //   this.handleSubmittedEvent(event);

  //         // default:
  //       // }
  //     });
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // }

  // public async handleReceivedFinalEvent(event: FireFlyEventDelivery) {
  //   try {
  //     switch (event.blockchainEvent.name) {
  //       case fireFlyEvents.COUPON_CREATED:
  //         const coupon = await this.couponService.findOne({
  //           query: { coupon_id: event.blockchainEvent.output?._tokenId },
  //         });
  //         await this.couponService.update(coupon.id, {
  //           status: StatusEnum.COMPLETED,
  //         });
  //         this.socketGateway.emitCreateCoupon({
  //           couponId: event.blockchainEvent.output?._tokenId,
  //           status: "Success",
  //           message: "Coupon created",
  //         });
  //       case fireFlyEvents.COUPON_REDEEMED:
  //         const redeemFind = await this.couponService.getRedeemedCoupon({
  //           address: event.blockchainEvent.output?._ad,
  //           coupon_id: event.blockchainEvent.output?._couponId,
  //         });
  //         await this.couponService.updateUserCoupon(redeemFind.id, {
  //           status: StatusEnum.COMPLETED,
  //         });
  //         this.socketGateway.emitCouponRedeemed(
  //           {
  //             coupon: redeemFind.coupon.coupon_id,
  //             status: "success",
  //             message: "Coupon redeemed",
  //           },
  //           event.blockchainEvent.output?._ad
  //         );
  //       case fireFlyEvents.COUPON_UPDATE:
  //         this.socketGateway.emitCouponUpdate({
  //           coupon_id: event.blockchainEvent.output?._couponId,
  //           status: "success",
  //           message: "Coupon updated",
  //         });
  //       case fireFlyEvents.DRIVER_CREDENTIALIZED:
  //         await this.entraHelperService.updateEntraDetails({
  //           address: event.blockchainEvent.output._driver
  //         })
  //         this.socketGateway.emitDriverCredentialized(
  //           {
  //             wallet: event.blockchainEvent.output?._driver,
  //             status: "success",
  //             message: "Driver credentialized",
  //           },
  //           event.blockchainEvent.output?._driver
  //         );
  //       case fireFlyEvents.DRIVER_CREDENTIAL_EDITED:
  //         this.socketGateway.emitDriverCredentialEdited(
  //           {
  //             wallet: event.blockchainEvent.output?._driver,
  //             message: "Driver credential edited",
  //             status: "success",
  //           },
  //           event.blockchainEvent.output?._driver
  //         );
  //       case fireFlyEvents.DRIVER_REGISTED:
  //         await this.entraHelperService.updateRegistrationDetails({
  //           address: event.blockchainEvent.output._driverAddress
  //         })
  //         this.socketGateway.emitDriverRegister(
  //           {
  //             wallet: event.blockchainEvent.output?._driverAddress,
  //             status: "success",
  //             message: "Driver registered",
  //           },
  //           event.blockchainEvent.output?._driverAddress
  //         );
  //       default:
  //         console.log("Other event");
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // }
}
