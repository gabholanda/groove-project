import { Test, TestingModule } from '@nestjs/testing';
import { GrooveAuthService } from './groove-auth.service';
import { HttpService, INestApplication, HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { AppModule } from 'src/app.module';

describe('GrooveAuthService', () => {
  let service: GrooveAuthService;
  let httpService: HttpService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [HttpService, GrooveAuthService],
    }).compile();

    app = module.createNestApplication();
    httpService = module.get<HttpService>(HttpService);
    service = module.get<GrooveAuthService>(GrooveAuthService);
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should get token', () => {
  //   jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
  //     of(result)
  //   })
  // })
});
