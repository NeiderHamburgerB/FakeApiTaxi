import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengersService } from '../passengers/passengers.service';
import { DriversService } from '../drivers/drivers.service';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private passengerService: PassengersService,
    private driverServicer:DriversService
  ) {}

  @ApiOperation({
    summary: 'Ep para solicitar y crear un viaje, datos de geolocalización simulados',
  })
  @Post()
  async create(@Body() createTripDto: CreateTripDto) {

    const existsPassenger = await this.passengerService.findOne({ id: createTripDto.passenger });

    if (!existsPassenger) {
      return {
        statusCode: 403,
        message: 'Lo siento, solo el pasajero puede pedir un viaje',
      };
    } else {
      createTripDto.origin_latitude = Math.random() * 180 - 90;
      createTripDto.origin_longitude = Math.random() * 360 - 180;
      createTripDto.destination_latitude = Math.random() * 180 - 90;
      createTripDto.destination_longitude = Math.random() * 360 - 180;
  
      createTripDto.status = 'INICIADO';
      const {
        cost
      } = this.getPrice(createTripDto.origin_latitude,createTripDto.origin_longitude,createTripDto.destination_latitude,createTripDto.destination_longitude)
      createTripDto.cost_total = cost

      return this.tripsService.create(createTripDto);

    }
    
  }

  @ApiOperation({
    summary:
      'Ep obtener el costo del viaje',
  })
  getPrice(origin_latitude:any,origin_longitude:any,end_latitude:any,end_longitude:any) {
    const res = this.tripsService.getPrice(
      origin_longitude,
      origin_latitude,
      end_longitude,
      end_latitude,
    );
    return res;
  }

  @ApiOperation({
    summary:
      'Ep cambiar el status de un viajes (a FINALIZADO)',
  })
  @Patch('finish/trip/:iddriver/:idtrip')
  async ChangeStatusTrip(@Param('iddriver') id: string, @Param('idtrip') id_: string){
    const existsDriver = await this.driverServicer.findOne({ id });

    if (!existsDriver) {
      return {
        statusCode: 403,
        message: 'Lo siento, solo el conductor puede finalizar un viaje',
      };
    } 
    return this.tripsService.update(+id_, {status:'FINALIZADO'});

  }


  @ApiOperation({
    summary:
      'Ep obtener todos los viajes',
  })
  @Get()
  findAll(){
    return this.tripsService.findAll();
  }

}
