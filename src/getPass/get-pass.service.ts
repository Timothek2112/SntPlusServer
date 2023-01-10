import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles/roles.service';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { createUchastokDto } from './dto/create-uchastok.dto';
import { Uchastki } from './models/uchastki.model';

@Injectable()
export class GetPassService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRole('USER');
    await user.$set('roleId', [role.id]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async createUchastok(dto: createUchastokDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });

    const uchastok = await this.uchastkiRepository.create(dto);
    await user.$add('uchastki', [uchastok.uchastok]);
    return uchastok;
  }
}
