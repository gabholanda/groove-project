import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { CustomerBuilder } from './builders/customer.builder';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService, CustomerBuilder],
})
export class AppModule { }
