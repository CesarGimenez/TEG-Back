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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { AreaService } from './area.service';
import { areaDTO } from './dto/area.dto';

@ApiBearerAuth()
@ApiTags('Areas')
@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAreas(@Res() res) {
    const data = await this.areaService.getAllAreas();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
