import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('suscripcion')
export class SuscripcionEntity {
    @PrimaryGeneratedColumn()
    id: number;  
    
    @Column()
    name: string;

    @Column()
    precio: number;

    @Column()
    descripcion: string;

    @ManyToMany(() => UserEntity, user => user.suscripciones)
    users: UserEntity[]
}
  