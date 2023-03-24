import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriversService } from '../drivers/drivers.service';
import { PassengersService } from '../passengers/passengers.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    private driveService: DriversService,
    private passengerService: PassengersService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    try {
      console.log(createTripDto);
      
      const newTrip = this.tripRepository.create(createTripDto);

      const trip = await this.tripRepository.save(newTrip);

      return trip;
      return 's';
    } catch (err) {
      return err;
    }
  }

   getPrice(
    longitude_start: any,
    latitude_start: any,
    longitude_end: any,
    latitude_end: any
  ) {
    const distance_km = this.driveService.distance_between_points(
      latitude_start,
      longitude_start,
      latitude_end,
      longitude_end,
    );

    const price_km = 1.5;
    const cost = distance_km * price_km;

    return {
      cost: Math.round(cost * 100) / 100,
    };
  }

  findAll() {
    try {
      return this.tripRepository.find();
    } catch (err) {
      return err;
    }
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
   
    try {
      let user = await this.tripRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('viaje no existe');
      return this.tripRepository.update(id, updateTripDto);
    } catch (err) {
      return err;
    }

  }

}
