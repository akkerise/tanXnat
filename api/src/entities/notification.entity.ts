import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: true,
    default: 'EMERGENCY',
  })
  type?: string;

  @Column({
    nullable: true,
    name: 'user_id',
    length: 36,
  })
  userId?: string;

  @Column()
  title?: string;

  @Column({
    type: 'text',
  })
  body?: string;

  @Column({
    type: 'text',
  })
  data?: string;

  @Column({
    default: false,
  })
  isRead?: boolean;

  @Column({
    default: false,
  })
  isSent?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
