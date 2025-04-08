import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('hijos')
export class HijoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true})
    edad: number;

    @ManyToOne(() => UserEntity, (user) => user.hijos)
    user: UserEntity;
}
  