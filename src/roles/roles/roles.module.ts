import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from '../../getPass/models/user_roles.model';
import { User } from '../../getPass/models/user.model';
import { RolesController } from './roles.controller';
import { Role } from './models/roles.model';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesModule, RolesService],
})
export class RolesModule {}
