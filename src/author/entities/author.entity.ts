import { LibroEntity } from "src/libro/entities/libros.entity"
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('autor')
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
 
    @Column()
    photo: string
     
    @Column()
    edad: number

    @OneToMany(() => LibroEntity, (libro) => libro.author)
    libros: LibroEntity[];

    @DeleteDateColumn()
    deleteAt: Date;
}
