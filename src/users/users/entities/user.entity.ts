import { Character } from 'src/characters/characters/entities/character.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  /* Relationships */
  @OneToMany(() => Character, (character) => character.user, {
    cascade: true,
  })
  characters: Character[];
}
