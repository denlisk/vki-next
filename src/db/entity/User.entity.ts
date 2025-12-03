import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ unique: true })
  Email!: string;

  @Column()
  FullName!: string;

  @Column()
  Password!: string;

  @Column({ default: true })
  IsActive!: boolean;
}
