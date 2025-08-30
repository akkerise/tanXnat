import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fcm')
export class FCMEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  subject?: string;

  @Column()
  message?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, name: 'link_to_news' })
  linkToNews?: string;

  @Column()
  type?: string;

  @Column()
  status?: string;

  @Column({ nullable: true, type: 'text', name: 'topic_name' })
  topicName?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
