import { IsEmail, IsNotEmpty } from "class-validator";

export class UsuarioDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    senha: string;
}