import { InventarioLibroEntity } from "src/inventario-libros/entities/inventario-libro.entity"
import { LibroEntity } from "src/libro/entities/libros.entity"
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('editorial')
export class EditorialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() 
    name: string

    @Column({nullable: true})
    photo: string

    @OneToMany(() => InventarioLibroEntity, (inventario) => inventario.editorial)
    libros: InventarioLibroEntity[];

    @DeleteDateColumn()
    deleteAt: Date;
}
