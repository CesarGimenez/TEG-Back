import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
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
import { AttachmentService } from './attachment.service';

@ApiBearerAuth()
@ApiTags('Attachment')
@Controller('attachment')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDocs(@Res() res) {
    try {
      const data = await this.attachmentService.getAllDocs();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw Error(error);
    }
  }

  @Get('/patient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'id del diagnostico' })
  async getAllDocsByPatient(@Res() res, @Param('id') id) {
    try {
      const data = await this.attachmentService.getAllDocsByPatient(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw Error(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar un nuevo diagnostico' })
  async createDiagnosis(@Res() res, @Body() body: any) {
    try {
      const data = await this.attachmentService.createDoc(body);
      return res.json(data);
    } catch (error) {
      throw Error(error);
    }
  }
}
