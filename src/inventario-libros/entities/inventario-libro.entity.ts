import { EditorialEntity } from "src/editorial/entities/editorial.entity";
import { IdiomaEntity } from "src/idiomas/entities/idioma.entity";
import { LibroEntity } from "src/libro/entities/libros.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventario_libros')
export class InventarioLibroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
 
    @UpdateDateColumn({ type: 'timestamp' }) 
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

    @ManyToOne(() => IdiomaEntity, (idioma) => idioma.libros)
    idioma: IdiomaEntity

    @ManyToOne(() => EditorialEntity, (editorial) => editorial.libros)
    editorial: EditorialEntity; 

    @ManyToOne(type => LibroEntity, (user: LibroEntity) => user.inventario)
    libro: LibroEntity;

    @ManyToOne(type => UserEntity, (user: UserEntity) => user.inventario)
    usuario: UserEntity;

    @Column()
    paginas: number

    @Column()
    year_publicacion: number;

    @Column()
    edicion: number;

    @Column({ name: 'precio_original', type: 'decimal', precision: 10, scale: 2, default: 0.0})
    precio_original: number;

    @Column({ name: 'precio_final', type: 'decimal', precision: 10, scale: 2, default: 0.0})
    precio_final: number;

    @Column()
    proveedor: string;

    @Column() 
    fecha_compra: Date;

    @Column({ default: true})
    disponible: boolean;

    @Column({ default: false})
    isLibroActualAsignado: boolean;
}
 