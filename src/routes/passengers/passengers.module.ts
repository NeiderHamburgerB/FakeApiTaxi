import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { Passenger } from './entities/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengersController],
  providers: [PassengersService],
  exports:[PassengersService]
})
export class PassengersModule {}
