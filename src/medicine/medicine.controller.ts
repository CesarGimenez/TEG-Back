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
import { MedicineDTO } from './dto/medicine.dto';
import { MedicineService } from './medicine.service';

@ApiBearerAuth()
@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res, @Query() { skip, limit }: PaginationParams) {
    try {
      const data = await this.medicineService.getAll(skip, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del medicamento' })
  async getOne(@Res() res, @Param('id') id) {
    try {
      const data = await this.medicineService.getOne(id);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar un nuevo medicamento' })
  @ApiBody({
    type: MedicineDTO,
  })
  async createMedicine(@Res() res, @Body() body: MedicineDTO) {
    try {
      const data = await this.medicineService.createMedicine(body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Editar un medicamento' })
  @ApiBody({
    type: MedicineDTO,
  })
  @ApiParam({ name: 'id', description: 'id del centro de salud' })
  async updateMedicine(@Res() res, @Body() body: MedicineDTO, @Param('id') id) {
    try {
      const data = await this.medicineService.updateMedicine(id, body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un medicamento' })
  @ApiParam({ name: 'id', description: 'id del medicamento' })
  async deleteMedicine(@Res() res, @Param('id') id) {
    try {
      const data = await this.medicineService.deleteMedicine(id);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
