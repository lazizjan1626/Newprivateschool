import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  
  @ApiPropertyOptional({
    description: 'Name of the role (optional for updates)',
    example: 'Admin',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the role (optional for updates)',
    example: 'Has full access to all resources and can manage other users.',
  })
  description?: string;
}
