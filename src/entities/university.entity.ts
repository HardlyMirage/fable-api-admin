import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity('universities')
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Course, course => course.university)
  courses: Course[];
}
