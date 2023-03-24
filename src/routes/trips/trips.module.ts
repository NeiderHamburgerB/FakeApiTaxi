import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { DriversModule } from '../drivers/drivers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { PassengersModule } from '../passengers/passengers.module';

@Module({
  imports:[
    DriversModule,
    PassengersModule,
    TypeOrmModule.forFeature([Trip])
  ],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
