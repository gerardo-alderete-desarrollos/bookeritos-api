import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesMuscleEntity } from "../../categories_muscle/entities/categories_muscle.entity";
import { UserEntity } from "../../users/entities/user.entity";

@Entity('excercise')
export class ExcerciseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    photo: string;

/*     @Column()
    categories_mucle_id: number; */

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @Column()
    updateAt: Date;

    @ManyToMany(() => CategoriesMuscleEntity, (category) => category.excercises, {
        cascade: true
    })
    @JoinTable()
    categoriesMuscle: CategoriesMuscleEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email',  })
    user: UserEntity;
  
    @Column()
    userEmail: string;
}
 