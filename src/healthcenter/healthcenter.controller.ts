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
import { HealthCenterDTO } from './dto/healthcenter.dto';
import { HealthcenterService } from './healthcenter.service';

@ApiBearerAuth()
@ApiTags('HealthCenter')
@Controller('healthcenter')
export class HealthcenterController {
  constructor(private healthCenterService: HealthcenterService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res, @Query() { skip, limit }: PaginationParams) {
    try {
      const data = await this.healthCenterService.getAll(skip, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del centro de salud' })
  async getOne(@Res() res, @Param('id') id) {
    try {
      const data = await this.healthCenterService.getOne(id);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('/doctor/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Traerse centros segun doctor' })
  @ApiParam({ name: 'id', description: 'id de doctor' })
  async getByDoctor(@Res() res, @Param('id') doctor_id) {
    try {
      const data = await this.healthCenterService.getByDoctor(doctor_id);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar un nuevo centro de salud' })
  @ApiBody({
    type: HealthCenterDTO,
  })
  async createHC(@Res() res, @Body() body: HealthCenterDTO) {
    try {
      const data = await this.healthCenterService.createHealthCenter(body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar un centro de salud' })
  @ApiBody({
    type: HealthCenterDTO,
  })
  @ApiParam({ name: 'id', description: 'id del centro de salud' })
  async updateHC(@Res() res, @Body() body: HealthCenterDTO, @Param('id') id) {
    try {
      const data = await this.healthCenterService.updateHealthCenter(id, body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un centro de salud' })
  @ApiParam({ name: 'id', description: 'id del centro de salud' })
  async deleteHC(@Res() res, @Param('id') id) {
    try {
      const data = await this.healthCenterService.deleteHealthCenter(id);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
