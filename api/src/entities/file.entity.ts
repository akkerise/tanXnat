import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  Column,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({
    nullable: true,
  })
  ext?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  mime?: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ default: false })
  used?: boolean;

  @Column({
    type: 'text',
    default: null,
  })
  path?: string;

  @Column({
    type: 'int',
    default: 0,
  })
  size?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
