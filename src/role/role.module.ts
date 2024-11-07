import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('RoleModule')
@Module({
  imports: [SequelizeModule.forFeature([Role])],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
