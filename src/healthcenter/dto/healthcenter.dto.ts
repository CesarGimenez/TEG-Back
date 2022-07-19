import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class HealthCenterDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  location: {
    latitude: string;
    longitude: string;
  };

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  phones: string;

  @ApiProperty()
  is_public: boolean;

  is_active: boolean;

  @ApiProperty()
  doctors: string[];
}
