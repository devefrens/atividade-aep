import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ) { }

    async singIn(email: string, senha: string): Promise<any> {
        const usuario = await this.usuariosService.findOneUser(email);

        if (usuario?.senha !== senha) {
            throw new UnauthorizedException();
        }

        const payload = { sub: usuario.id, email: usuario.email };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }
}
