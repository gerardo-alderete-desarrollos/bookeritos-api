import { LibroEntity } from "src/libro/entities/libros.entity"
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('editorial')
export class EditorialEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    name: string

    @Column()
    photo: string

    @OneToMany(() => LibroEntity, (libro) => libro.editorial)
    libros: LibroEntity[];

    @DeleteDateColumn()
    deleteAt: Date;
}
