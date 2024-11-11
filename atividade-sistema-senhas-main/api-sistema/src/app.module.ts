import { Usuario } from './usuarios/usuario.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Senha } from './senhas/senha.entity';
import { SenhasModule } from './senhas/senhas.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "admin",
      password: "admin123",
      database: "sistema",
      entities: [Senha, Usuario],
      synchronize: true
    }),
    SenhasModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
