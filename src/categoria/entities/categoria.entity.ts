import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { LibroEntity } from "src/libro/entities/libros.entity";

@Entity('categoria')
export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;
 
    @Column()
    photo: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @Column()
    updateAt: Date;
 
    @ManyToMany(() => LibroEntity, (libros) => libros.categorias)
    libros: LibroEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: UserEntity;
  
    @Column()
    userEmail: string;

    @DeleteDateColumn()
    deleteAt: Date;
}
