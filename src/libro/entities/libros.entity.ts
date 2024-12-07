import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";

@Entity('libro')
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    photo: string;

/*     @Column()
    categories_mucle_id: number; */

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @Column()
    updateAt: Date;

    @ManyToMany(() => CategoriaEntity, (category) => category.libros, {
        cascade: true
    })
    @JoinTable()
    categorias: CategoriaEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: UserEntity;
  
    @Column()
    userEmail: string;

    @DeleteDateColumn()
    deleteAt: Date;

    @Column()
    paginas: number

    @Column()
    year_publicacion: number;

    @Column()
    edicion: number;

    @Column()
    idioma: string;

    @Column()
    edad_recomendada: string;

    @Column()
    precio_original: number;

    @Column()
    precio_final: number;

    @Column()
    proveedor: string;

    @Column()
    fecha_compra: Date;

    @Column()
    llego_compra: boolean;

    @Column()
    estatus_renta: string;

}
 