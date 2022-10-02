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
import { MedicineArrayDTO, PharmacyDTO } from './dto/pharmacy.dto';
import { PharmacyService } from './pharmacy.service';

@ApiBearerAuth()
@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res) {
    const data = await this.pharmacyService.getAll();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async getOne(@Res() res, @Param('id') id) {
    const data = await this.pharmacyService.getOne(id);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post('/medicines')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Traerse farmacias segun medicinas' })
  @ApiBody({
    type: MedicineArrayDTO,
  })
  async getPharmacyByMedicine(@Res() res, @Body() body: any) {
    const data = await this.pharmacyService.getByMedicine(body);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar nueva farmacia' })
  @ApiBody({
    type: PharmacyDTO,
  })
  async createPharmacy(@Res() res, @Body() body: PharmacyDTO) {
    const data = await this.pharmacyService.createPharmacy(body);
    return res.json({
      data,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar farmacia' })
  @ApiBody({
    type: PharmacyDTO,
  })
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async updatePharmacy(@Res() res, @Body() body: PharmacyDTO, @Param('id') id) {
    const data = await this.pharmacyService.updatePharmacy(id, body);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar farmacia' })
  @ApiParam({ name: 'id', description: 'id de farmacia' })
  async deletePharmacy(@Res() res, @Param('id') id) {
    const data = await this.pharmacyService.deletePharmacy(id);
    return res.json({
      data,
    });
  }
}
