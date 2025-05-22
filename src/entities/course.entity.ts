import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { University } from './university.entity';
import { Event } from './event.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  courseUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => University, university => university.courses)
  university: University;

  @ManyToMany(() => Event)
  @JoinTable({
    name: 'course_events',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
  })
  events: Event[];
}
