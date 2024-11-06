import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Response } from 'express';
import { Teacher } from './models/teacher.model';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('signup')
  async create(@Body() createTeacherDto: CreateTeacherDto, @Res() res: Response) {
    return this.teachersService.signup(createTeacherDto, res);
  }

  @Post('login')
  async login(@Body() createTeacherDto: CreateTeacherDto, @Res() res: Response) {
    return this.teachersService.login(createTeacherDto.email, createTeacherDto.password, res);
  }

  @Post('logout')
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
    return await this.teachersService.logout(authHeader, res);
  }
  

  @Post('refresh-token')
  async refreshToken(teacherModel: Teacher, @Res() res: Response) {
    return this.teachersService.refreshToken(teacherModel.refreshToken, res);
  }

  //get id 
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.teachersService.findOne(+id);
  // }
  




}
