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
import { userDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res) {
    const data = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo usuario' })
  @ApiBody({
    type: userDTO,
  })
  async createUser(@Res() res, @Body() createUser: userDTO) {
    const user = await this.userService.createUser(createUser);
    return res.json({
      user,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Traerse los detalles de un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  async getOneUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getOneUser(id);
    return res.json({
      user,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar los datos de un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  @ApiBody({
    type: userDTO,
  })
  async updateUser(@Res() res, @Param('id') id, @Body() updateUser: userDTO) {
    const data = await this.userService.updateUser(id, updateUser);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar a un usuario' })
  @ApiParam({ name: 'id', description: 'id del usuario' })
  async deleteUser(@Res() res, @Param('id') id) {
    const data = await this.userService.deleteUser(id);
    return res.json({
      data,
    });
  }
}
