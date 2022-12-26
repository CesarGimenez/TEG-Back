import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

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
  @ApiProperty({ example: 'Se transmite por..' })
  transmission: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  require_diagnosys: boolean;

  @ApiProperty({ example: [], default: [] })
  areas: string[];

  @ApiProperty({ example: 'Se puede tratar con..' })
  treatment: string;
}
