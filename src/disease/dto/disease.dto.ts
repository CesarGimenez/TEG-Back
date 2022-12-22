import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DiseaseDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'Enfermedad de..' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Es un virus/afeccion que..' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Normalmente presenta..' })
  syntoms: string;

  @IsNotEmpty()
  @ApiProperty({ example: [''] })
  areas: string[];

  @ApiProperty({ example: 'Se puede tratar con..' })
  treatment: string;
}
