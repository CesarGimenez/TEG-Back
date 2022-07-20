import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any): Promise<any> {
    const { email, password } = user;
    const data = await this.usersService.findOneByEmail(email);
    if (!data) throw new HttpException('INVALID_CREDENTIALS', 403);
    const checkPassword = await compare(password, data.password);
    if (!checkPassword) throw new HttpException('INVALID_CREDENTIALS', 403);
    const payload = { name: user.first_name, id: user._id, email: user.email };

    return {
      data,
      access: this.jwtService.sign(payload),
    };
  }

  async getMe(cookie): Promise<any> {
    try {
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findOneByEmail(data.email);
      return {
        user,
        token: cookie,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
