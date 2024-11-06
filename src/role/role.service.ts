import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const existingRole = await this.roleModel.findOne({
        where: { name: createRoleDto.name },
      });
      if (existingRole) {
        throw new ConflictException(`Role with name ${createRoleDto.name} already exists.`);
      }

      const role = await this.roleModel.create(createRoleDto);
      return role;
    } catch (error) {
      console.log(error);
      throw error instanceof ConflictException ? error : new InternalServerErrorException('Failed to create role');
    }
  }

  async findAll() {
    try {
      return await this.roleModel.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to retrieve roles');
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleModel.findByPk(id);
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to retrieve role');
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(id);
      return await role.update(updateRoleDto);
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to update role');
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      await role.destroy();
      return { message: `Role with ID ${id} has been removed successfully.` };
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to delete role');
    }
  }
}
