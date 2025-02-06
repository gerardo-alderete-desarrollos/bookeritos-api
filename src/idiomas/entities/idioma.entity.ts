import { LibroEntity } from "src/libro/entities/libros.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('idiomas')
export class IdiomaEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @ManyToMany(() => UserEntity, (usuarios) => usuarios.idiomasInteres)
    usuarios: UserEntity[];

    @OneToMany(() => LibroEntity, (libro) => libro.idioma)
    libros: LibroEntity[];
}
 