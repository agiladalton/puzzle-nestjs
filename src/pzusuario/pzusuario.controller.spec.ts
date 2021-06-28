import { Test, TestingModule } from '@nestjs/testing';
import { PzusuarioController } from './pzusuario.controller';
import { PzusuarioService } from './pzusuario.service';

describe('PzusuarioController', () => {
  let controller: PzusuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PzusuarioController],
      providers: [PzusuarioService],
    }).compile();

    controller = module.get<PzusuarioController>(PzusuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
