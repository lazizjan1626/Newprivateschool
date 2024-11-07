import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  
  @ApiProperty({
    description: 'Adminning ismi',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name bo‘sh bo‘lishi mumkin emas' })
  name: string;

  @ApiProperty({
    description: 'Adminning email manzili',
    example: 'johndoe@example.com',
  })
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri formatda' })
  @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas' })
  email: string;

  @ApiProperty({
    description: 'Adminning paroli',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @MinLength(8, { message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Parol bo‘sh bo‘lishi mumkin emas' })
  password: string;

  @ApiProperty({
    description: 'Admin aktiv yoki aktiv emasligini bildiradi',
    example: true,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: 'Admin yaratuvchi (creator) roliga ega yoki yo‘qligini bildiradi',
    example: false,
  })
  @IsBoolean()
  is_creator: boolean;
}
