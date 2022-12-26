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
import { passwordDTO } from './dto/password.dto';
import { updateUserDto } from './dto/update-user.dto';
import { userDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Res() res, @Query() { skip, limit }: PaginationParams) {
    try {
      const data = await this.userService.getAllUsers(skip, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get('/role/:id')
  @ApiOperation({ summary: 'Traerse a los usuarios segun su rol' })
  @ApiParam({ name: 'id', description: 'id del rol' })
  @UseGuards(JwtAuthGuard)
  async getUsersByRole(@Res() res, @Param('id') role_id) {
    const data = await this.userService.getUsersByRole(role_id);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Get('/area/:id')
  @ApiOperation({ summary: 'Traerse a los usuarios segun su area' })
  @ApiParam({ name: 'id', description: 'id del area' })
  @UseGuards(JwtAuthGuard)
  async getUsersByArea(@Res() res, @Param('id') area_id) {
    const data = await this.userService.getUsersByArea(area_id);
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Get('/disease/:id')
  @ApiOperation({ summary: 'Traerse a los usuarios segun si ven enfermedad' })
  @ApiParam({ name: 'id', description: 'id de la enfermedad' })
  @UseGuards(JwtAuthGuard)
  async getUsersByDisease(@Res() res, @Param('id') disease_id) {
    const doctors = await this.userService.getDoctorsByDisease(disease_id);
    return res.status(HttpStatus.OK).json({
      doctors,
    });
  }

  @Get('/dni/:dni')
  @ApiOperation({
    summary: 'Traerse los detalles de un usuario a partir de su DNI',
  })
  @ApiParam({ name: 'dni', description: 'dni del usuario' })
  @UseGuards(JwtAuthGuard)
  async getUserByDNI(@Res() res, @Param('dni') dni) {
    const user = await this.userService.getUserByDNI(dni);
    return res.json({
      user,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Traerse los detalles de un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Res() res, @Param('id') id) {
    const userDetail = await this.userService.getOneUser(id);
    return res.json({
      userDetail,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo usuario' })
  @ApiBody({
    type: userDTO,
  })
  async createUser(@Res() res, @Body() createUser: userDTO) {
    const userEmailFound = await this.userService.findOneByEmail(
      createUser?.email,
    );
    if (userEmailFound) {
      return res.json({
        error: 'Correo actualmente en uso',
      });
    }
    const user = await this.userService.createUser(createUser);
    return res.json({ user, msg: 'Tu cuenta se ha creado con exito!' });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar los datos de un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  @ApiBody({
    type: updateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Res() res,
    @Param('id') id,
    @Body() updateUser: updateUserDto,
  ) {
    const data = await this.userService.updateUser(id, updateUser);
    return res.json({
      data,
    });
  }

  @Put('changepass/:id')
  @ApiOperation({ summary: 'Editar clave de ingreso del usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  @ApiBody({
    type: passwordDTO,
  })
  async updatePassword(@Res() res, @Param('id') id, @Body() body: passwordDTO) {
    const data = await this.userService.changePassword(id, body);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar a un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Res() res, @Param('id') id) {
    const data = await this.userService.deleteUser(id);
    return res.json({
      data,
    });
  }

  @Put('uploadImage/:id')
  @ApiOperation({ summary: 'Subir imagen de perfil a usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  async uploadImageUser(@Res() res, @Param('id') id, @Body() body) {
    const { image } = body;
    const data = await this.userService.uploadImageUser(image, id);
    return res.json({
      data,
    });
  }
}
