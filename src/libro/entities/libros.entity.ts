import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { EditorialEntity } from "src/editorial/entities/editorial.entity";

@Entity('libro')
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    photo: string;



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
  
    @ManyToOne(() => AuthorEntity, (author) => author.libros)
    author: AuthorEntity

    @ManyToOne(() => EditorialEntity, (editorial) => editorial.libros)
    editorial: EditorialEntity; 

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

    @Column({ name: 'precio_original', type: 'decimal', precision: 10, scale: 2, default: 0.0})
    precio_original: number;

    @Column({ name: 'precio_final', type: 'decimal', precision: 10, scale: 2, default: 0.0})
    precio_final: number;

    @Column()
    proveedor: string;

    @Column()
    fecha_compra: Date;

    @Column()
    llego_compra: boolean;

    @Column()
    estatus_renta: string;

    @Column({ nullable: true})
    sinopsis: string;

}
 