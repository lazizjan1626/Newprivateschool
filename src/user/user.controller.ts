import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.signup(createUserDto, res);
  }


  @Get('all')
  async findAll(@Res() res: Response) {
      return this.userService.findAll(res);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.login(createUserDto.email, createUserDto.password, res);
  }

  @Post('logout')
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
      return  await this.userService.logout(authHeader, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }



}
