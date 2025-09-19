import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Story } from '../entities/story.entity';

@Entity('chapters')
export class Chapter {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ required: false })
  @Column({ length: 255, nullable: true })
  title?: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  author?: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;
  
  @ApiProperty()
  @Column({ type: 'text' })
  coverUrl: string;  

  @ApiProperty()
  @Column({ type: 'text' })
  source: string;

  @ManyToOne(() => Story, (s) => s.chapters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ApiProperty()
  @Index()
  @Column()
  storyId: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}

