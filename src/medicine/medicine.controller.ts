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
import { MedicineDTO } from './dto/medicine.dto';
import { MedicineService } from './medicine.service';

@ApiBearerAuth()
@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res) {
    const data = await this.medicineService.getAll();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del medicamento' })
  async getOne(@Res() res, @Param('id') id) {
    const data = await this.medicineService.getOne(id);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar un nuevo medicamento' })
  @ApiBody({
    type: MedicineDTO,
  })
  async createMedicine(@Res() res, @Body() body: MedicineDTO) {
    const data = await this.medicineService.createMedicine(body);
    return res.json({
      data,
    });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar un medicamento' })
  @ApiBody({
    type: MedicineDTO,
  })
  @ApiParam({ name: 'id', description: 'id del centro de salud' })
  async updateMedicine(@Res() res, @Body() body: MedicineDTO, @Param('id') id) {
    const data = await this.medicineService.updateMedicine(id, body);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un medicamento' })
  @ApiParam({ name: 'id', description: 'id del medicamento' })
  async deleteMedicine(@Res() res, @Param('id') id) {
    const data = await this.medicineService.deleteMedicine(id);
    return res.json({
      data,
    });
  }
}
