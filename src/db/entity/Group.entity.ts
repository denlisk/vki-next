import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from 'typeorm';
import { Student } from './Student.entity';

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column()
  Name!: string;

  @Column({ nullable: true })
  Contacts?: string;

  @OneToMany(() => Student, student => student.Group)
  Students!: Relation<Student>[];
}
