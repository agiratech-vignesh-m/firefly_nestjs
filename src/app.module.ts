import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FireflyModule } from './api/firefly/firefly.module';
import { IpfsModule } from './api/ipfs/ipfs.module';
import configService from "./config/configService.config";
import { ConfigModule } from "@nestjs/config";
// import { ApiService } from './api/api.service';
import { Web3Service } from './api/web3/web3.service';
import { SocketGateway } from './api/socket/socket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configService],
    }),
    FireflyModule, 
    IpfsModule],
  controllers: [AppController],
  providers: [AppService, Web3Service, SocketGateway],
})
export class AppModule {}
