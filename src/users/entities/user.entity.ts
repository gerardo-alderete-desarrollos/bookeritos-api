
import { AfterUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from '../../common/enums/rol.enum';
import { HijoEntity } from 'src/hijo/entities/hijo.entity';
import { IdiomaEntity } from 'src/idiomas/entities/idioma.entity';
import { CategoriaEntity } from 'src/categoria/entities/categoria.entity';
import { SuscripcionEntity } from 'src/suscripciones/entities/suscripcion.entity';

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

    @ManyToMany(() => IdiomaEntity, (idiomas) => idiomas.usuarios, {
        cascade: true
    })
    @JoinTable()
    idiomasInteres: IdiomaEntity[];  
    
    @ManyToMany(() => CategoriaEntity, (category) => category.usuarios, {
        cascade: true
    }) 
    @JoinTable()
    generosInteres: CategoriaEntity[]; 

    @ManyToMany(() => SuscripcionEntity, suscripcion => suscripcion.users)
    @JoinTable({
        name: 'usuarios_suscripcion',
        joinColumn: {
        name: 'userId',
        referencedColumnName: 'id',
        },
        inverseJoinColumn: {
        name: 'suscripcionId',
        referencedColumnName: 'id',
        },
    })
    suscripciones: SuscripcionEntity[]

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

/*     @Column({ nullable: true})
    idiomaInteresHijos: string;

    @Column({ nullable: true})
    generoInteresHijos: string; */

    @Column({ nullable: true})
    preguntasComentarios: string;
    
    @DeleteDateColumn()
    deleteAt: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({ default: false, nullable: true})
    isProfileComplete: boolean;


}
