import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles/roles.service';
import { Users } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { createUchastokDto } from './dto/create-uchastok.dto';
import { Uchastki } from './models/uchastki.model';
import { PatchUserDto } from 'src/auth/dto/patch-user.dto';
import { Role } from 'src/roles/roles/models/roles.model';
import { urlencoded } from 'express';

@Injectable()
export class GetPassService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Uchastki) private uchastkiRepository: typeof Uchastki,
    @InjectModel(Role) private roleRepository: typeof Role,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    if(dto.SntId == null)
      throw new HttpException('not found Snt id', 400);
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRole('USER');
    await user.$set('role', [role.id]);
    user.SntId = dto.SntId;
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

  async patchUser(patch: PatchUserDto, id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      include: { all: true },
    });

    if (patch.name) {
      await user.$set('name', patch.name);
    }

    if (patch.role) {
      const role = await this.roleRepository.findOne({
        where: { id: patch.role },
        include: { all: true },
      });
      if (user.role) {
        const oldRole = await this.roleRepository.findOne({
          where: { id: user.roleId },
          include: { all: true },
        });
        oldRole.$remove('users', user);
      }
      user.$set('role', [role.id]);
      role.$add('users', [user.id]);
    }

    if (patch.surname) {
      await user.$set('surname', patch.name);
    }
    if (patch.uchastok) {
      const uch = await this.uchastkiRepository.findOne({
        where: { uchastok: patch.uchastok },
        include: { all: true },
      });
      user.$add('uchastki', [uch.id]);
    }
    return 'ok';
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
    await user.$add('uchastki', [uchastok.id]);
    return uchastok;
  }

  async GetUchastokId(uchastok: number, sntId: number) {
    return {
      sntId: (
        await this.uchastkiRepository.findOne({
          where: { uchastok: uchastok, SntId: sntId },
        })
      ).id,
    };
  }
}
