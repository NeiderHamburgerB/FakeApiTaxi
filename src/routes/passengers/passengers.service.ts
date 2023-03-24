import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDriverSearch } from '../drivers/interfaces/driver.interface';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengersService {

  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}


  async create(createPassengerDto: CreatePassengerDto) {
    try {
      const newPassenger = this.passengerRepository.create(createPassengerDto);

      const passenger = await this.passengerRepository.save(newPassenger);

      return passenger;
    } catch (err) {
      return err;
    }
  }

  findAll() {
    try {
      return this.passengerRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(data: IDriverSearch) {
    try {
      let user = await this.passengerRepository.findOne({ where: data });
       return user;
    } catch (err) {
      return err;
    }
  }

  async update(id: number, updatePassengerDto: UpdatePassengerDto) {
    try {
      let user = await this.passengerRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Pasajero no existe');
      return this.passengerRepository.update(id, updatePassengerDto);
    } catch (err) {
      return err;
    }
  }

  async remove(id: number) {
    try {
      let user = await this.passengerRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Pasajero no existe');
      return this.passengerRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
