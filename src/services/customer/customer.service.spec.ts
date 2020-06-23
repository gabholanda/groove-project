import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { RedisService } from 'src/redis/redis.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, RedisService],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(redisService).toBeDefined();
    expect(service).toBeDefined();
  });
});
