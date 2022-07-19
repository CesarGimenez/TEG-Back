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
import { DiseaseService } from './disease.service';
import { DiseaseDTO } from './dto/disease.dto';

@ApiTags('Diseases')
@Controller('disease')
export class DiseaseController {
  constructor(private diseaseService: DiseaseService) {}

  @Get()
  async getAllDiseases(@Res() res) {
    const data = await this.diseaseService.getAllDiseases();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'id de la enfermdad' })
  async getOneDisease(@Res() res, @Param('id') id) {
    const data = await this.diseaseService.getOneDisease(id);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Agregar una nueva enfermedad' })
  @ApiBody({
    type: DiseaseDTO,
  })
  async createDisease(@Res() res, @Body() createDisease: DiseaseDTO) {
    const data = await this.diseaseService.createDisease(createDisease);
    return res.json({
      data,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar una enfermedad' })
  @ApiBody({
    type: DiseaseDTO,
  })
  @ApiParam({ name: 'id', description: 'id de la enfermdad' })
  async updateDisease(
    @Res() res,
    @Body() updateDisease: DiseaseDTO,
    @Param('id') id,
  ) {
    const data = await this.diseaseService.updateDisease(id, updateDisease);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar una enfermedad' })
  @ApiParam({ name: 'id', description: 'id de la enfermedad' })
  async deleteDisease(@Res() res, @Param('id') id) {
    const data = await this.diseaseService.deleteDisease(id);
    return res.json({
      data,
    });
  }
}
