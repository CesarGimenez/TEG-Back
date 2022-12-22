import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class Location {
  @ApiProperty({ example: 39.550051 })
  lat: number;
  @ApiProperty({ example: -105.782067 })
  lng: number;
}
export class PharmacyDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nombre de alguna Farmacia' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: Location })
  location: Location;

  @IsNotEmpty()
  @ApiProperty({ example: 'Calle 1 con avenida 1' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Lara' })
  state: string;

  @IsNotEmpty()
  @ApiProperty({ example: '+58 5555445' })
  phones: string;

  is_active: boolean;

  @ApiProperty({ example: [''] })
  medicines: string[];
}

export class MedicineArrayDTO {
  @ApiProperty()
  medicines: string[];
}
