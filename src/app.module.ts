import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './config/env/env.module';
import { DriversModule } from './routes/drivers/drivers.module';
import { TripsModule } from './routes/trips/trips.module';
import { PassengersModule } from './routes/passengers/passengers.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    DriversModule,
    TripsModule,
    PassengersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
