import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({
    type: String,
  })
  name_driver: string;

  @ApiProperty({
    type: String,
  })
  last_name: string;

  @ApiProperty({
    type: String,
  })
  document_type: string;

  @ApiProperty({
    type: String,
  })
  document_value: string;

  @ApiProperty({
    type:Date 
  })
  birth_date: Date;

  status: string;

  latitude: number;

  longitude: number;

}
