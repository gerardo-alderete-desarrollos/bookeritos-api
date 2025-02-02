import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('idiomas')
export class IdiomaEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @ManyToMany(() => UserEntity, (usuarios) => usuarios.idiomasInteres)
    usuarios: UserEntity[];
}
