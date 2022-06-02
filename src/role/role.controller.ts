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
import { roleDTO } from './dto/role.dto';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAllRoles(@Res() res) {
    const data = await this.roleService.getAllRoles();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Agregar un nuevo rol' })
  @ApiBody({
    type: roleDTO,
  })
  async createUser(@Res() res, @Body() createRole: roleDTO) {
    const role = await this.roleService.createRole(createRole);
    return res.json({
      role,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Editar los datos de un rol' })
  @ApiParam({ name: 'id', description: 'id del rol' })
  @ApiBody({
    type: roleDTO,
  })
  async updateUser(@Res() res, @Param('id') id, @Body() roleDTO: roleDTO) {
    const data = await this.roleService.updateRole(id, roleDTO);
    return res.json({
      data,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiParam({ name: 'id', description: 'id del rol' })
  async deleteRole(@Res() res, @Param('id') id) {
    const data = await this.roleService.deleteRole(id);
    return res.json({
      data,
    });
  }
}
