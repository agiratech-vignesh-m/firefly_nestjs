import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1", "2"],
  });

  await app.listen(3001);
}
bootstrap();
