import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Entity,
  Column,
  OneToOne,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { FileEntity } from './file.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true, nullable: true, default: null })
  username?: string;

  @Column({ type: 'text', nullable: true })
  family?: string;

  @Column({
    unique: false,
    nullable: true,
    default: 'unknown',
  })
  gender?: string;

  @Column({
    name: 'active',
    default: true,
  })
  active?: boolean;

  @Column({ select: false })
  password?: string;

  @Column({ name: 'role_id' })
  roleId?: number;
  @ManyToOne(() => RoleEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  @Column({ nullable: true, name: 'expired_at', type: 'date' })
  expiredAt?: Date;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, name: 'file_id' })
  fileId?: string;
  @OneToOne(() => FileEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'file_id' })
  avatar?: FileEntity;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ unique: true, nullable: true, default: null })
  inviteCode?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
