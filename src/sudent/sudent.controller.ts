import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers } from '@nestjs/common';
import { SudentService } from './sudent.service';
import { CreateSudentDto } from './dto/create-sudent.dto';
import { UpdateSudentDto } from './dto/update-sudent.dto';
import { Response } from 'express';

@Controller('sudent')
export class SudentController {
  constructor(private readonly sudentService: SudentService) {}


  @Post('signup')
  async create(@Body() createStudentDto: CreateSudentDto, @Res() res: Response) {
    return this.sudentService.signup(createStudentDto, res);
  }
  @Get('all')
  async findAll(@Res() res: Response) {
      return this.sudentService.findAll(res);
  }
  @Post()
  async createStudentWithParents(
    @Body() createStudentDto: any,
  ) {
    const { parentIds, ...studentData } = createStudentDto;
    return this.sudentService.createStudentWithParents(studentData, parentIds);
  }


  @Post('login')
  async login(@Body() createSudentDto: CreateSudentDto, @Res() res: Response) {
    return this.sudentService.login(createSudentDto.email, createSudentDto.password, res);
  }
  @Post('logout')
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
      return  await this.sudentService.logout(authHeader, res);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sudentService.findOne(+id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSudentDto: UpdateSudentDto) {
    return this.sudentService.update(+id, updateSudentDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sudentService.remove(+id);
  }
  





}
