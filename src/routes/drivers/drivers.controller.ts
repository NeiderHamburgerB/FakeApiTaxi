import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @ApiOperation({
    summary: 'Ep para simular una latitud y longitud falsa',
  })
  @Get('fakelocation')
  getFakelocation() {
  
    const latitude = Math.random() * 180 - 90;

    const longitude = Math.random() * 360 - 180;

    return { latitude, longitude };
  }

  @ApiOperation({
    summary: 'EP para crear un conductor',
  })
  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    const fakeLocation = this.getFakelocation();

    createDriverDto.status = 'DISPONIBLE';
    createDriverDto.latitude = fakeLocation.latitude;
    createDriverDto.longitude = fakeLocation.longitude;

    const driver = await this.driversService.findOne({
      document_value:createDriverDto.document_value
    });

    if (driver) {
      throw new NotAcceptableException('User exists');
    }
    
    return this.driversService.create(createDriverDto);
    
  }

  @ApiOperation({
    summary: 'Ep para obtener todos los conductores',
  })
  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @ApiOperation({
    summary: 'Ep para obtener un conductor por id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne({id});
  }

  @ApiOperation({
    summary: 'Ep para obtener todos los conductores disponibles',
  })
  @Get('get/disponibles')
  findAvailable() {
    return this.driversService.findAvailable();
  }

  @ApiOperation({
    summary: 'Ep para actualizar un conductor',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @ApiOperation({
    summary: 'Ep para eliminar un conductor',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }


  @ApiOperation({
    summary: 'Ep para obtener los conductores en un rango de 3km, en este caso se simula la longitud y latitud del usuario pero el calculo matematico si se realiza',
  })
  @Get('get/driverInThreeKm')
  driverInThreeKm() {
    const ubiUserFake = this.getFakelocation()
    return this.driversService.driverInThreeKm(ubiUserFake);
  }

}
