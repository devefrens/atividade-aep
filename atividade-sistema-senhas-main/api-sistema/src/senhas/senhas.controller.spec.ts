import { Test, TestingModule } from '@nestjs/testing';
import { SenhaController } from './senhas.controller';

describe('SenhasController', () => {
  let controller: SenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SenhaController],
    }).compile();

    controller = module.get<SenhaController>(SenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
