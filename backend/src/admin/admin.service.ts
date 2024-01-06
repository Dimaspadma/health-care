import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/typeorm/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(registerAdminDto: RegisterAdminDto) {
    // Check if dokter already exists by no_ktp
    const admin = await this.adminRepository.findOneBy({
      username: registerAdminDto.username,
    });

    // If admin already exists, throw error
    if (admin) {
      return null;
    }

    // Hash password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerAdminDto.password, saltOrRounds);

    registerAdminDto.password = hash;

    const newAdmin = this.adminRepository.create(registerAdminDto);
    return this.adminRepository.save(newAdmin);
  }

  // login admin by nama and password
  async login(registerAdminDto: RegisterAdminDto): Promise<any> {
    // Compare hash password
    const admin = await this.adminRepository.findOneBy({
      username: ILike(registerAdminDto.username),
    });
    if (admin) {
      const match = await bcrypt.compare(
        registerAdminDto.password,
        admin.password,
      );
      if (match) {
        const payload = { sub: admin.id, name: admin.username, role: 'admin' };
        return {
          id: admin.id,
          username: admin.username,
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return null;
  }
}
