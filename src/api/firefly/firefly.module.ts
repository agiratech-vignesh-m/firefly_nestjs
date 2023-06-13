import { Module } from '@nestjs/common';
import { FireflyService } from './firefly.service';
import { FireflyController } from './firefly.controller';
import { FireFlyListener } from './listener.service';
import { SocketGateway } from '../socket/socket.gateway';

@Module({
  controllers: [FireflyController],
  providers: [FireflyService, FireFlyListener, SocketGateway]
})
export class FireflyModule {}
