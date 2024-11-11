import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioDTO } from './DTO/usuario.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) { }

    @Get()
    getUsuariosList() {
        return this.usuarioRepository.find();
    }

    @Get(":id")
    async getUsuarioById(@Param("id") id: number) {
        return await this.usuarioRepository.findOneBy({ id: id });
    }

    @Post()
    createUsuario(@Body() usuarioDTO: UsuarioDTO) {
        const usuario = this.usuarioRepository.create(usuarioDTO);
        this.usuarioRepository.save(usuario);
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: number, @Body() usuarioDTO: UsuarioDTO) {

        const usuario = await this.usuarioRepository.findOneBy({id});

        if (usuario === null) {
            throw new NotFoundException(`Usuário com id '${id}' não encontrada`);
        }

        usuario.email = usuarioDTO.email;
        usuario.nome = usuarioDTO.nome;
        usuario.senha = usuarioDTO.senha;

        return this.usuarioRepository.save(usuario);
    }

    @Delete(":id")
    async deleteUsuarioById(@Param("id") id: number) {
        await this.usuarioRepository.delete(id);
    }
}
