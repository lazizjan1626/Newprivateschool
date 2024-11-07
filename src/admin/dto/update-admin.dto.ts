import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

  @ApiProperty({
    description: 'Adminning yangi ismi',
    example: 'Admin Ismi',
    required: false,
  })
  @IsString({ message: 'Ism satr (string) bo\'lishi kerak' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Adminning yangi email manzili',
    example: 'admin@example.com',
    required: false,
  })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Adminning yangi hashed paroli (eng kamida 8 ta belgidan iborat)',
    example: 'yangiParol123',
    required: false,
  })
  @IsString({ message: 'Hashed parol satr (string) bo\'lishi kerak' })
  @MinLength(8, { message: 'Hashed parol eng kamida 8 ta belgidan iborat bo\'lishi kerak' })
  @IsOptional()
  hashed_password?: string;

  @ApiProperty({
    description: 'Adminning faol yoki faol emasligini bildiradi',
    example: true,
    required: false,
  })
  @IsBoolean({ message: 'is_active qiymati boolean (true yoki false) bo\'lishi kerak' })
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    description: 'Admin yaratuvchi (creator) ekanligini bildiradi',
    example: false,
    required: false,
  })
  @IsBoolean({ message: 'is_creator qiymati boolean (true yoki false) bo\'lishi kerak' })
  @IsOptional()
  is_creator?: boolean;
}
