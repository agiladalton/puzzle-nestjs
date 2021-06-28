import { Test, TestingModule } from '@nestjs/testing';
import { PztareaController } from './pztarea.controller';
import { PztareaService } from './pztarea.service';

describe('PztareaController', () => {
  let controller: PztareaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PztareaController],
      providers: [PztareaService],
    }).compile();

    controller = module.get<PztareaController>(PztareaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
