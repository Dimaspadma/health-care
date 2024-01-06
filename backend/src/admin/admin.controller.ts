import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(AdminService) private readonly adminService: AdminService,
  ) {}

  @Post('register')
  async register(@Body() registerAdminDto: RegisterAdminDto) {
    const admin = await this.adminService.register(registerAdminDto);
    if (admin) {
      return {message: 'admin berhasil ditambahkan', data: {id: admin.id, username: admin.username}};
    }
    throw new HttpException({message: 'username already exists', error: 'Bad Request', statusCode: 400}, HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() registerAdminDto: RegisterAdminDto) {
    const admin = await this.adminService.login(registerAdminDto);
    if (admin) {
      return {message: 'success login', data: admin};
    }
    throw new HttpException({message: 'Unauthorized', error: 'Unauthorized', statusCode: 401}, HttpStatus.UNAUTHORIZED);
  }
}
