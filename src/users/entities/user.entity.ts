
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from '../../common/enums/rol.enum';
import { HijoEntity } from 'src/hijo/entities/hijo.entity';

@Entity('usuarios')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true})
    edad: number;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Rol, default: Rol.MEMBER  })
    rol: string

    @OneToMany(() => HijoEntity, (hijo) => hijo.user)
    hijos: HijoEntity[];

    @Column({ nullable: true})
    direccion: string;

    @Column({ nullable: true})
    referencias: string;

    @Column({ nullable: true})
    telefono: string;

    @Column({ nullable: true})
    ine: string;

    @Column({ nullable: true})
    comprobanteDomicilio: string;

    @Column({ nullable: true})
    cantidadHijos: number;

    @Column({ nullable: true})
    nivelLectorHijos: string;

    @Column({ nullable: true})
    idiomaInteresHijos: string;

    @Column({ nullable: true})
    generoInteresHijos: string;

    @Column({ nullable: true})
    preguntasComentarios: string;
    
    @DeleteDateColumn()
    deleteAt: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
