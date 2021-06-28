import { Test, TestingModule } from '@nestjs/testing';
import { PztareaService } from './pztarea.service';

describe('PztareaService', () => {
  let service: PztareaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PztareaService],
    }).compile();

    service = module.get<PztareaService>(PztareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
