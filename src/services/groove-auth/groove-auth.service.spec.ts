import { Test, TestingModule } from '@nestjs/testing';
import { GrooveAuthService } from './groove-auth.service';

describe('GrooveAuthService', () => {
  let service: GrooveAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrooveAuthService],
    }).compile();

    service = module.get<GrooveAuthService>(GrooveAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
