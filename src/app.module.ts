import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { SharedModule } from './context/shared/shared.module';

@Module({
  imports: [ApiModule, SharedModule],
})
export class AppModule {}
