import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  
  @ApiProperty({
    description: 'Name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) 
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Has full access to all resources and can manage other users.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 200)
  description: string;
}
