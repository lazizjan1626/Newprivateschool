import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) {}

  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
  @ApiResponse({ status: 409, description: 'Role with the given name already exists' })
  @ApiResponse({ status: 500, description: 'Failed to create role due to server error' })
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


  @ApiOperation({
    summary: 'Update a role by ID',
    description: 'Fields marked with * are required',
  })
  async findAll() {
    try {
      return await this.roleModel.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to retrieve roles');
    }
  }


  @ApiOperation({ summary: 'Retrieve a role by ID' })
  @ApiResponse({ status: 200, description: 'Role retrieved successfully', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
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



  @ApiOperation({ summary: 'Update a role by ID' })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(id);
      return await role.update(updateRoleDto);
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to update role');
    }
  }


  
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
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
