import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { AuthGuard } from '../guard/auth-guard';
import { IsCreatorGuard } from '../guard/isCreator-guard';

@ApiTags('Admin') 
@Controller('admin')
// @UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 403, description: 'Kirish taqiqlangan' })


  @Post('signup')
  async create(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    return this.adminService.signup(createAdminDto, res);
  }

  @UseGuards(IsCreatorGuard)
  @ApiOperation({ summary: 'Barcha adminlarni ko\'rish' })
  @ApiResponse({ status: 200, description: 'Adminlar ro\'yxati muvaffaqiyatli olindi' })
  @Get('all')
  async findAll(@Res() res: Response) {
    return this.adminService.findAll(res);
  }


  @ApiOperation({ summary: 'Admin login qilish' })
  @ApiResponse({ status: 200, description: 'Admin muvaffaqiyatli tizimga kirdi' })
  @Post('login')
  async login(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    return this.adminService.login(createAdminDto.email, createAdminDto.password, res);
  }



  // @UseGuards(IsCreatorGuard)
  @ApiOperation({ summary: 'Admin logout qilish' })
  @ApiBearerAuth() 
  @ApiResponse({ status: 200, description: 'Admin muvaffaqiyatli tizimdan chiqdi' })
  @Post('logout')
  async logout(@Res() res: Response, @Headers('Authorization') authHeader: string) {
    return await this.adminService.logout(authHeader, res);
  }

  @ApiOperation({ summary: 'Adminni ID bo\'yicha olish' })
  @ApiResponse({ status: 200, description: 'Admin muvaffaqiyatli topildi' })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Admin ma\'lumotlarini yangilash' })
  @ApiBearerAuth()
  // @UseGuards(IsCreatorGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Adminni o\'chirish' })
  @ApiBearerAuth()
  // @UseGuards(IsCreatorGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
