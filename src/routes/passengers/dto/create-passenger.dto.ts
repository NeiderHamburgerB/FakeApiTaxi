import { ApiProperty } from '@nestjs/swagger';

export class CreatePassengerDto {
  @ApiProperty({
    type: String,
  })
  name_passenger: string;

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

  @ApiProperty()
  birth_date: Date;

}
