import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AreaService } from './area.service';
import { areaDTO } from './dto/area.dto';

@ApiTags('Areas')
@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  async getAllAreas(@Res() res) {
    const data = await this.areaService.getAllAreas();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Agregar una nueva area (especialidad)' })
  @ApiBody({
    type: areaDTO,
  })
  async createUser(@Res() res, @Body() createArea: areaDTO) {
    const area = await this.areaService.createArea(createArea);
    return res.json({
      area,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar un area (especialidad)' })
  @ApiBody({
    type: areaDTO,
  })
  @ApiParam({ name: 'id', description: 'id del area' })
  async updateArea(@Res() res, @Body() updateArea: areaDTO, @Param('id') id) {
    const area = await this.areaService.updateArea(id, updateArea);
    return res.json({
      area,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar una area (especialidad)' })
  @ApiParam({ name: 'id', description: 'id del area' })
  async deleteArea(@Res() res, @Param('id') id) {
    const area = await this.areaService.deleteArea(id);
    return res.json({
      area,
    });
  }
}
