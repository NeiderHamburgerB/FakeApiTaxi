import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Driver } from './entities/driver.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Driver])
  ],
  controllers: [DriversController],
  providers: [DriversService],
  exports:[DriversService]
})
export class DriversModule {}
