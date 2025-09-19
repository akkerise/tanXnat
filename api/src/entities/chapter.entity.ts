import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Index } from 'typeorm';
import { Story } from './story.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('chapters')
export class Chapter {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  zh?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  vi?: string;

  @ApiProperty()
  @Index()
  @Column({ type: 'int', nullable: true })
  number?: number;

  @ManyToOne(() => Story, story => story.chapters, { onDelete: 'CASCADE' })
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
