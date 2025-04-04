import { IsNotEmpty } from "class-validator";
import { Estatus } from "src/common/enums/estatus.enum";
import { Rol } from "src/common/enums/rol.enum";
import { SuscripcionEntity } from "src/suscripciones/entities/suscripcion.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios_suscripcion')
export class UsuarioSuscripcionEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;


    @ManyToOne(type => UserEntity, (user: UserEntity) => user.suscripciones)
    user: UserEntity;
    @ManyToOne(type => SuscripcionEntity, (sus:SuscripcionEntity) => sus.users)
    suscription: SuscripcionEntity;

    @Column({ type: 'enum', enum: Estatus, default: Estatus.INACTIVE  })
    @IsNotEmpty()
    estatus: string

    @Column({default: 0})
    cambiosRestantes: number; 

    @Column()
    comprobantePago: string;

    @Column()
    fechaInicioSuscripcion: Date;

    @Column()
    fechaFinSuscripcion: Date;

    @Column({nullable: true, default: null})
    fechaEntrega?: Date;
}
  