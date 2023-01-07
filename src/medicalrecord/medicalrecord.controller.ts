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
  Res,
  Query,
  HttpStatus,
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
import { PaginationParams } from 'src/pagination';

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
  async findAllMedicalRecords(
    @Res() res,
    @Query() { skip, limit }: PaginationParams,
  ) {
    try {
      const medicalrecord =
        await this.medicalrecordService.findAllMedicalRecords(skip, limit);
      return res.status(HttpStatus.OK).json(medicalrecord);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
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

  @Get('patient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar un historial medico' })
  @ApiParam({ name: 'id', description: 'id del paciente' })
  async findOneByPatient(@Param('id') id: string) {
    try {
      const medicalRecordPatient =
        await this.medicalrecordService.findOneMedicalRecordByPatient(id);
      return medicalRecordPatient;
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
