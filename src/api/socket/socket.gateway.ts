import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: "events",
  cors: "*:*",
  trasports: ["websocket", "polling"]
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  private client: Socket;

  handleConnection(client: Socket) {
    console.log("client connected");
    this.client = client;
  }

  handleDisconnect(client: Socket) {
    console.log("disconnected...");
    this.client = null;
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  emitCouponCreated(coupon: any) {
    this.client.emit("coupon-created", coupon);
  }

  emitCouponRedeem(coupon: any) {
    this.client.emit("coupon-redeemed", coupon);
  }

  emitUpdatedCouponMetaInfo(coupon: any) {
    this.client.emit("coupon-metaData", coupon);
  }

  emitUpdatedCouponEndDate(coupon: any) {
    this.client.emit("coupon-endDate", coupon);
  }

  emitDriverCredentialAndEndDateUpdated(coupon: any) {
    this.client.emit("credential-updated", coupon);
  } 
  emitRegistered(register: any) {
    this.client.emit("driver-registered", register);
  }

  emitLicenseUpdated(coupon: any) {
    this.client.emit("license-updated", coupon);
  }

  emitDriverCredentialUpdated(coupon: any) {
    this.client.emit("credential-updated", coupon);
  }

  emitCouponReactivated(coupon: any) {
    this.client.emit("credential-updated", coupon);
  }

  emitCouponDeactivated(coupon: any) {
    this.client.emit("credential-updated", coupon);
  }
}
