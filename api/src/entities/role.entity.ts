import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  slug?: string;

  @Column()
  name?: string;

  @Column('simple-array', {
    nullable: true,
  })
  permissions?: string[];

  @Column({
    name: 'is_can_edit',
    default: true,
  })
  isCanEdit?: boolean;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive?: boolean;

  @OneToMany(() => UserEntity, (m) => m.roleId)
  users?: UserEntity[];

  @Column({
    name: 'role_id',
    nullable: true,
  })
  roleId?: number;
  @ManyToOne(() => RoleEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'role_id' })
  parent?: RoleEntity;

  @OneToMany(() => RoleEntity, (role) => role.roleId)
  children?: RoleEntity[];

  @CreateDateColumn({
    name: 'create_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
