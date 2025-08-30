import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  Column,
} from 'typeorm';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    nullable: true,
  })
  agent?: string;

  @Column({
    nullable: true,
  })
  ip?: string;

  @Column({ length: 2000 })
  token: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
  })
  refreshToken: string;

  @Column({ length: 2000, name: 'line_token', nullable: true })
  lineToken: string;

  @Column({
    name: 'line_refresh_token',
    nullable: true,
  })
  lineRefreshToken: string;

  @CreateDateColumn({ name: 'create_at' })
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
