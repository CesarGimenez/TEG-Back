import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MedicalrecordService } from './medicalrecord.service';
import { CreateMedicalrecordDto } from './dto/create-medicalrecord.dto';
import { UpdateMedicalrecordDto } from './dto/update-medicalrecord.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@ApiBearerAuth()
@ApiTags('MedicalRecord')
@Controller('medicalrecord')
export class MedicalrecordController {
  constructor(private readonly medicalrecordService: MedicalrecordService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar una nueva historia medica' })
  @ApiBody({
    type: CreateMedicalrecordDto,
  })
  async createMedicalRecord(
    @Body() createMedicalrecordDto: CreateMedicalrecordDto,
  ) {
    try {
      return await this.medicalrecordService.createMedicalRecord(
        createMedicalrecordDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllMedicalRecords() {
    try {
      return await this.medicalrecordService.findAllMedicalRecords();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar un historial medico' })
  @ApiParam({ name: 'id', description: 'id de la historia medica' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.medicalrecordService.findOneMedicalRecord(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar los datos de una historia medica' })
  @ApiParam({ name: 'id', description: 'id de la historia medica' })
  @ApiBody({
    type: UpdateMedicalrecordDto,
  })
  async updateMedicalRecord(
    @Param('id') id: string,
    @Body() updateMedicalrecordDto: UpdateMedicalrecordDto,
  ) {
    try {
      return await this.medicalrecordService.updateMedicalRecord(
        id,
        updateMedicalrecordDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar una historia medica' })
  @ApiParam({ name: 'id', description: 'id de la historia medica' })
  async removeMedicalRecord(@Param('id') id: string) {
    try {
      return await this.medicalrecordService.removeMedicalRecord(id);
    } catch (error) {
      throw error;
    }
  }
}
