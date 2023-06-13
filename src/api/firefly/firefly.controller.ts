import { Controller, Get, Post } from '@nestjs/common';
import { FireflyService } from './firefly.service';

@Controller('firefly')
export class FireflyController {
  constructor(private readonly fireflyService: FireflyService) {}

  @Post('create')
  async createCoupon() {
    return this.fireflyService.createCoupon();
  }
  @Get('coupon')
  async getCouponDetails() {
    return this.fireflyService.getCouponDetails();
  }
  @Post('register')
  async registerDriver() {
    return this.fireflyService.registerDriver();
  }
  @Post('redeem')
  async redeemCoupon() {
    return this.fireflyService.redeemCoupon();
  }
  @Get('regDetails')
  async getDriverDetails() {
    return this.fireflyService.getDriverDetails();
  }

  @Post('cred')
  async driverCredential() {
    return this.fireflyService.driverCredential();
  }

  @Get('credDetails')
  async getCredentialDetails() {
    return this.fireflyService.getCredentialDetails();
  }
}
