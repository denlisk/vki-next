import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation, JoinColumn } from 'typeorm';
import { Group } from './Group.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ nullable: true })
  UUID?: string;

  @Column()
  FirstName!: string;

  @Column()
  LastName!: string;

  @Column({ nullable: true })
  MiddleName?: string;

  @Column({ nullable: true })
  Contacts?: string;

  @Column({ nullable: true })
  GroupId?: number;

  @ManyToOne(() => Group, group => group.Students)
  @JoinColumn({ name: 'GroupId' })
  Group?: Relation<Group>;

  @Column({ default: false })
  IsDeleted!: boolean;
}
