import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Senha } from './senha.entity';
import { SenhasController } from './senhas.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Senha])],
    controllers: [SenhasController]
})
export class SenhasModule {}
