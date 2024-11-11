import { AuthService } from './auth.service';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthDTO } from './DTO/auth.dto';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() singInDto: AuthDTO) {
        return this.authService.singIn(singInDto.email, singInDto.senha);
    }
}
