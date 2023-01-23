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
import { DiagnosticService } from './diagnostic.service';
import { DiagnosisDTO } from './dto/diagnostic.dto';

@ApiBearerAuth()
@ApiTags('Diagnosis')
@Controller('diagnosis')
export class DiagnosticController {
  constructor(private diagnosisService: DiagnosticService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRoles(@Res() res) {
    try {
      const data = await this.diagnosisService.getAllDiagnosis();
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      throw Error(error);
    }
  }

  @Get('/patient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del diagnostico' })
  async getAllDiagnosisByPatient(
    @Res() res,
    @Param('id') id,
    @Query() { limit }: PaginationParams,
  ) {
    try {
      const data = await this.diagnosisService.getDiagnosisByPatient(id, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw Error(error);
    }
  }

  @Get('/doctor/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del diagnostico' })
  async getAllDiagnoisByDoctor(@Res() res, @Param('id') id) {
    try {
      const data = await this.diagnosisService.getDiagnosisByDoctor(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw Error(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar un nuevo diagnostico' })
  @ApiBody({
    type: DiagnosisDTO,
  })
  async createDiagnosis(@Res() res, @Body() diagnosisBody: DiagnosisDTO) {
    try {
      const diagnosis = await this.diagnosisService.createDiagnosis(
        diagnosisBody,
      );
      return res.json(diagnosis);
    } catch (error) {
      throw Error(error);
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar los datos de un diagnostico' })
  @ApiParam({ name: 'id', description: 'id del diagnostico' })
  @ApiBody({
    type: DiagnosisDTO,
  })
  async updateDiagnostic(
    @Res() res,
    @Param('id') id,
    @Body() DiagnosisDTO: DiagnosisDTO,
  ) {
    try {
      const data = await this.diagnosisService.updateDiagnosis(
        id,
        DiagnosisDTO,
      );
      return res.json({
        data,
      });
    } catch (error) {
      throw Error(error);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un diagnostico' })
  @ApiParam({ name: 'id', description: 'id del diagnostico' })
  async deleteDiagnosis(@Res() res, @Param('id') id) {
    try {
      const data = await this.diagnosisService.deleteDiagnosis(id);
      return res.json({
        data,
      });
    } catch (error) {
      throw Error(error);
    }
  }
}
