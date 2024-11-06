import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcryptjs';
import { Role } from '../role/models/role.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {

      const UserEmail = await this.userModel.findOne({ 
        where: { email: createUserDto.email },
      });

      if (UserEmail) {
        throw new ConflictException('Resource already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.userModel.create({
        ...createUserDto,
        hashed_password: hashedPassword, 
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.findAll({
        include: {
          model: Role,
          attributes: ['name',],
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userModel.findByPk(id,{
        include: {
          model: Role,
          attributes: ['name','description'],
        },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id)
      return await user.update({
        ...updateUserDto,
        roleID: updateUserDto.roleID,
      });
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const user = await this.findOne(id);
      await user.destroy();
      return `User with ID ${id} has been successfully deleted.`;
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete user');
    }
  }
  
}
