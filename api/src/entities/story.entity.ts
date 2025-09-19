import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity('stories')
export class Story {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Index()
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ required: false })
  @Column({ length: 255, nullable: true })
  author?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @Column({ length: 512, nullable: true })
  coverUrl?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', nullable: true })
  source?: string;

  @OneToMany(() => Chapter, (c) => c.story, { cascade: true })
  chapters: Chapter[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}

