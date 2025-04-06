import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { SharedModule } from './context/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    ApiModule,
    SharedModule,
  ],
})
export class AppModule {}
