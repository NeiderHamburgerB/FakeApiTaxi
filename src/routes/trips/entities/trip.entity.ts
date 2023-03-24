import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Passenger } from 'src/routes/passengers/entities/passenger.entity';
import { Driver } from 'src/routes/drivers/entities/driver.entity';


export enum statusOpt {
  INICIADO = 'INICIADO',
  FINALIZADO = 'FINALIZADO',
  SOLICITUD_EN_PROCESO = 'SOLICITUD_EN_PROCESO' 
}

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Passenger)
  passenger: Passenger;

  @ManyToOne(() => Driver)
  driver: Driver;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column('decimal', )
  origin_latitude: number;

  @Column('decimal',)
  origin_longitude: number;

  @Column('decimal',)
  destination_latitude: number;

  @Column('decimal', )
  destination_longitude: number;

  @Column('decimal',)
  cost_total: number;

  @Column({type:'enum',enum:statusOpt})
  status:string

}
