import { Test, TestingModule } from '@nestjs/testing';
import { PzusuarioService } from './pzusuario.service';

describe('PzusuarioService', () => {
  let service: PzusuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PzusuarioService],
    }).compile();

    service = module.get<PzusuarioService>(PzusuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
