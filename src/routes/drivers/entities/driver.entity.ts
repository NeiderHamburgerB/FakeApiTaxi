import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum statusOpt {
  DISPONIBLE = 'DISPONIBLE',
  OCUPADO = 'OCUPADO'
}

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_driver: string;

  @Column()
  last_name: string;

  @Column()
  document_type: string;

  @Column()
  document_value: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({type:'enum',enum:statusOpt})
  status: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
  created_at:Date

}