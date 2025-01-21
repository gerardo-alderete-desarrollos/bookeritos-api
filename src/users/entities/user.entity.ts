
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Rol } from '../../common/enums/rol.enum';

@Entity('usuarios')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true, nullable: false})
    //@OneToMany(() => ExcerciseEntity, (exercise)=> exercise.user)
    email: string;

    @Column({nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Rol, default: Rol.MEMBER  })
    rol: string

    @DeleteDateColumn()
    deleteAt: Date;

/*     @Column({nullable: true})
    userCreateEmail: string; */

}
