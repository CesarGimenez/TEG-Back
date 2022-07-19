import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiBody({
    type: authDTO,
  })
  async login(@Res() res: Response, @Body() auth: authDTO) {
    const user = await this.authService.login(auth);
    res.cookie('jwt', user.access);
    return res.json({
      user,
    });
  }

  @Get('/me')
  async getMe(@Req() req: Request) {
    const cookie = req.cookies['jwt'];
    const data = await this.authService.getMe(cookie);
    return data;
  }
}
