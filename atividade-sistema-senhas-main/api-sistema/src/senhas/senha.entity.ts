import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Senha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "senha"})
    nome: string;

    @Column()
    valor: string;

}