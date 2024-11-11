import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Senha } from './senha.entity';
import { Repository } from 'typeorm';
import { SenhaDTO } from './DTO/senha.dto';

@Controller('senhas')
export class SenhasController {

    constructor(
        @InjectRepository(Senha)
        private senhaRepository: Repository<Senha>
    ) {}

    @Get()
    index() {
        return this.senhaRepository.find();
    }

    @Get(":id")
    find(@Param("id") id: number) {
        return this.senhaRepository.findBy({id});
    }

    @Post()
    create(@Body() senhaDTO: SenhaDTO) {
        const senha = this.senhaRepository.create(senhaDTO);
        return this.senhaRepository.save(senha);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() senhaDTO: SenhaDTO) {
        const senha = await this.senhaRepository.findOneBy({id});

        if (senha === null) {
            throw new NotFoundException(`Senha com id '${id}' não encontrada`);
        }

        senha.nome = senhaDTO.nome;
        senha.valor = senhaDTO.valor;

        return this.senhaRepository.save(senha);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        await this.senhaRepository.delete(id);
    }
}
