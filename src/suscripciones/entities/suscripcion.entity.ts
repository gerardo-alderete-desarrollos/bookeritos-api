import { UserEntity } from "src/users/entities/user.entity";
import { UsuarioSuscripcionEntity } from "src/usuario-suscripciones/entities/usuario-suscripcione.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('suscripcion')
export class SuscripcionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    precio: number;

    @Column()
    descripcion: string;

    @Column({default: 6})
    cantidadLibros?: number;

    @Column({default: 0})
    cambios?: number

 /*    @ManyToMany(() => UserEntity, user => user.suscripciones)
    users: UserEntity[] */

    @OneToMany(type => UsuarioSuscripcionEntity, usersSuscription => usersSuscription.user)
    users: UsuarioSuscripcionEntity[];
}
  