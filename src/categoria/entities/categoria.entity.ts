import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { LibroEntity } from "src/libro/entities/libros.entity";

@Entity('categoria')
export class CategoriaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;
 
    @Column({nullable: true})
    photo: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
 
    @UpdateDateColumn({ type: 'timestamp' }) 
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
    @ManyToMany(() => LibroEntity, (libros) => libros.categorias)
    libros: LibroEntity[];

    @ManyToMany(() => UserEntity, (usuarios) => usuarios.generosInteres)
    usuarios: UserEntity[];
}
