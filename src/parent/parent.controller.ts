import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers } from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new parent' })
  @ApiResponse({
    status: 201,
    description: 'Parent successfully signed up.',
  })
  async create(@Body() createParentDto: CreateParentDto, @Res() res: Response) {
    return this.parentService.signup(createParentDto, res);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all parents' })
  @ApiResponse({
    status: 200,
    description: 'List of all parents.',
  })
  async findAll(@Res() res: Response) {
    return this.parentService.findAll(res);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing parent' })
  @ApiResponse({
    status: 200,
    description: 'Parent successfully logged in.',
  })
  async login(@Body() createParentDto: CreateParentDto, @Res() res: Response) {
    return this.parentService.login(createParentDto.email, createParentDto.password, res);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out the parent' })
  @ApiResponse({
    status: 200,
    description: 'Parent successfully logged out.',
  })
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
    return await this.parentService.logout(authHeader, res);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a parent by ID' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({
    status: 200,
    description: 'The parent information.',
  })
  async findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update parent information by ID' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({
    status: 200,
    description: 'Parent information updated successfully.',
  })
  async update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a parent by ID' })
  @ApiParam({ name: 'id', description: 'Parent ID' })
  @ApiResponse({
    status: 200,
    description: 'Parent successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
