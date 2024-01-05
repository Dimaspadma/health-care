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
      return 'admin berhasil ditambahkan';
    }
    throw new HttpException('username already exists', HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() registerAdminDto: RegisterAdminDto) {
    const admin = await this.adminService.login(registerAdminDto);
    if (admin) {
      return admin;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
