import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers } from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Response } from 'express';


@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}


  @Post('signup')
  async create(@Body() createParentDto: CreateParentDto, @Res() res: Response) {
    return this.parentService.signup(createParentDto, res);
  }
  @Get('all')
  async findAll(@Res() res: Response) {
      return this.parentService.findAll(res);
  }


  @Post('login')
  async login(@Body() createParentDto: CreateParentDto, @Res() res: Response) {
    return this.parentService.login(createParentDto.email, createParentDto.password, res);
  }
  @Post('logout')
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
      return  await this.parentService.logout(authHeader, res);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
  
}
