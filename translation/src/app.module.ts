import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { translateServiceProvider } from './translate/provider';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [translateServiceProvider, AppService],
})
export class AppModule {}
