import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "src/routes/drivers/entities/driver.entity";
import { Passenger } from "src/routes/passengers/entities/passenger.entity";
import { Trip } from "src/routes/trips/entities/trip.entity";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DatabaseProvider = [
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (config:ConfigService) => ({
            type: 'postgres',
            host: config.get('DB_HOST_DEV'),
            port: parseInt(config.get('DB_PORT_DEV')),
            database: config.get('DB_DEV'),
            username: config.get('DB_USERNAME_DEV'),
            password: config.get('DB_PASSWORD_DEV'),
            entities:[Driver, Passenger, Trip],
            synchronize:true,
            namingStrategy: new SnakeNamingStrategy()
        })
    })
    
]