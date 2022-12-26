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
import { MedicineArrayDTO, PharmacyDTO } from './dto/pharmacy.dto';
import { PharmacyService } from './pharmacy.service';

@ApiBearerAuth()
@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res, @Query() { skip, limit }: PaginationParams) {
    try {
      const data = await this.pharmacyService.getAll(skip, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async getOne(@Res() res, @Param('id') id) {
    try {
      const data = await this.pharmacyService.getOne(id);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Post('/medicines')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Traerse farmacias segun medicinas' })
  @ApiBody({
    type: MedicineArrayDTO,
  })
  async getPharmacyByMedicine(@Res() res, @Body() body: any) {
    try {
      const data = await this.pharmacyService.getByMedicine(body);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar nueva farmacia' })
  @ApiBody({
    type: PharmacyDTO,
  })
  async createPharmacy(@Res() res, @Body() body: PharmacyDTO) {
    try {
      const data = await this.pharmacyService.createPharmacy(body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar farmacia' })
  @ApiBody({
    type: PharmacyDTO,
  })
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async updatePharmacy(@Res() res, @Body() body: PharmacyDTO, @Param('id') id) {
    try {
      const data = await this.pharmacyService.updatePharmacy(id, body);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar farmacia' })
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async deletePharmacy(@Res() res, @Param('id') id) {
    try {
      const data = await this.pharmacyService.deletePharmacy(id);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
