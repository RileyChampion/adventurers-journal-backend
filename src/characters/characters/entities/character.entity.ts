import { User } from 'src/users/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  character_id: string;

  @Column()
  name: string;

  @Column()
  class: string;

  @Column()
  level: number;

  @Column()
  background: string;

  @Column()
  race: string;

  @Column()
  isAlive: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn()
  deleted_on: Date;

  /* Relationships */
  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
