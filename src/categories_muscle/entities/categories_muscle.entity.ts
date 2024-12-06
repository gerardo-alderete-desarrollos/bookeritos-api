import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExcerciseEntity } from "../../excercises/entities/excercise.entity";
import { UserEntity } from "../../users/entities/user.entity";

@Entity('categories_muscle')
export class CategoriesMuscleEntity {
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
 
    @ManyToMany(() => ExcerciseEntity, (excercises) => excercises.categoriesMuscle)
    excercises: ExcerciseEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: UserEntity;
  
    @Column()
    userEmail: string;
}
