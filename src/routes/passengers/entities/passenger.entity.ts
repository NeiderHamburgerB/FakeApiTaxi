import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_passenger: string;

  @Column()
  last_name: string;

  @Column()
  document_type: string;

  @Column()
  document_value: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
  created_at:Date
}