import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { CustomerBuilder } from './builders/customer.builder';
import { GrooveAuthService } from './services/groove-auth/groove-auth.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService, GrooveAuthService, RedisService, CustomerBuilder]
})
export class AppModule { }
