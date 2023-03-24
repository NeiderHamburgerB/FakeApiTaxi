import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Passenger')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @ApiOperation({
    summary: 'EP para crear un pasajero',
  })
  @Post()
  async create(@Body() createPassengerDto: CreatePassengerDto) {

    try {
      const passenger = await this.passengersService.findOne({
        document_value:createPassengerDto.document_value
      });
  
      console.log(passenger)
      if (passenger) {
        throw new NotAcceptableException('User exists');
      }

      return this.passengersService.create(createPassengerDto);

    } catch (err) {
      return err
    }
  }

  @ApiOperation({
    summary: 'Ep para obtener todos los pasajeros',
  })
  @Get()
  findAll() {
    return this.passengersService.findAll();
  }
  @ApiOperation({
    summary: 'Ep para obtener un pasajero por id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengersService.findOne({id});
  }

  @ApiOperation({
    summary: 'Ep para actualizar un pasajero',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengersService.update(+id, updatePassengerDto);
  }

  @ApiOperation({
    summary: 'Ep para eliminar un pasajero',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengersService.remove(+id);
  }
}
