import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver, statusOpt } from './entities/driver.entity';
import { IDriverSearch } from './interfaces/driver.interface';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    try {
      const newDriver = this.driverRepository.create(createDriverDto);

      const driver = await this.driverRepository.save(newDriver);

      return driver;
    } catch (err) {
      return err;
    }
  }

  findAll() {
    try {
      return this.driverRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(data: IDriverSearch) {
    try {
      let user = await this.driverRepository.findOne({ where: data });
      return user;
    } catch (err) {
      return err;
    }
  }

  async findAvailable() {
    try {
      let users = await this.driverRepository
        .find({ where: { status: statusOpt.DISPONIBLE } })
        .catch((E) => console.log(E));
      return users;
    } catch (err) {
      return err;
    }
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      let user = await this.driverRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Conductor no existe');
      return this.driverRepository.update(id, updateDriverDto);
    } catch (err) {
      return err;
    }
  }

  async remove(id: number) {
    try {
      let user = await this.driverRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Conductor no existe');
      return this.driverRepository.delete(id);
    } catch (err) {
      return err;
    }
  }

  distance_between_points(
    latUser: any,
    lonUser: any,
    latDriver: any,
    lonDriver: any,
  ) {
    const radio_tierra_km = 6371;
    const dLat = ((latDriver - latUser) * Math.PI) / 180;
    const dLon = ((lonDriver - lonUser) * Math.PI) / 180;
    const lat1_rad = (latUser * Math.PI) / 180;
    const lat2_rad = (latDriver * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1_rad) *
        Math.cos(lat2_rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance_km = radio_tierra_km * c;
    return distance_km;
  }

  async driverInThreeKm(ubiUserFake: any) {
    try {
      let DriverInthreeKm = [];

      const drivers = await this.driverRepository.find();

      drivers.map((e) => {
        let distancie_km = this.distance_between_points(
          ubiUserFake.latitude,
          ubiUserFake.longitude,
          e.latitude,
          e.longitude,
        );
        if (distancie_km >= 3) {
          DriverInthreeKm.push({
            nombre: e.name_driver,
            apellido: e.last_name,
          });
        }
      });

      return {
        message: 'Conductores en 3km',
        total: DriverInthreeKm.length === 0 ? 0 : DriverInthreeKm.length,
        conductores:DriverInthreeKm
      };
    } catch (err) {
      return err;
    }
  }
}
