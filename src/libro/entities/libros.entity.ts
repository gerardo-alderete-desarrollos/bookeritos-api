import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { EditorialEntity } from "src/editorial/entities/editorial.entity";
import { IdiomaEntity } from "src/idiomas/entities/idioma.entity";
import { InventarioLibroEntity } from "src/inventario-libros/entities/inventario-libro.entity";

@Entity('libro')
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photo: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
 
    @UpdateDateColumn({ type: 'timestamp' }) 
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

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

    @OneToMany(type => InventarioLibroEntity, inventarioLibro => inventarioLibro.libro)
    inventario: InventarioLibroEntity[];

    @Column()
    userEmail: string;

    @Column()
    edad_recomendada: string;

    @Column({ nullable: true})
    sinopsis: string;

}
 