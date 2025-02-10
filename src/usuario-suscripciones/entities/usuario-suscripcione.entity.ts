import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios_suscripcion')
export class UsuarioSuscripcionEntity {
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column()
    fechaFinSuscripcion: Date;

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    userId: number;

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    suscripcionId: number;

    @Column()
    @IsNotEmpty()
    estatus: boolean;
}
  