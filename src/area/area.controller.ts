import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
import { PaginationParams } from 'src/pagination';
import { AreaService } from './area.service';
import { areaDTO } from './dto/area.dto';

@ApiBearerAuth()
@ApiTags('Areas')
@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  async getAllAreas(@Res() res, @Query() { skip, limit }: PaginationParams) {
    try {
      const data = await this.areaService.getAllAreas(skip, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Agregar una nueva area (especialidad)' })
  @ApiBody({
    type: areaDTO,
  })
  async createUser(@Res() res, @Body() createArea: areaDTO) {
    try {
      const area = await this.areaService.createArea(createArea);
      return res.json({
        area,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Editar un area (especialidad)' })
  @ApiBody({
    type: areaDTO,
  })
  @ApiParam({ name: 'id', description: 'id del area' })
  async updateArea(@Res() res, @Body() updateArea: areaDTO, @Param('id') id) {
    try {
      const area = await this.areaService.updateArea(id, updateArea);
      return res.json({
        area,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar una area (especialidad)' })
  @ApiParam({ name: 'id', description: 'id del area' })
  async deleteArea(@Res() res, @Param('id') id) {
    try {
      const area = await this.areaService.deleteArea(id);
      return res.json({
        area,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
