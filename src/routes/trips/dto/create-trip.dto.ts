import { ApiProperty } from "@nestjs/swagger";
import { Passenger } from "src/routes/passengers/entities/passenger.entity";
import { Driver } from "typeorm";

export class CreateTripDto {
    @ApiProperty()
    passenger: any;
    
    @ApiProperty()
    driver: any;

    @ApiProperty()
    start_date:Date

    @ApiProperty()
    end_date:Date

    origin_latitude:number

    origin_longitude:number

    destination_latitude:number

    destination_longitude:number

    cost_total:number

    status:string

}
