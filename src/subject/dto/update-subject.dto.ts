import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {

  @ApiPropertyOptional({
    description: 'Name of the subject (optional for updates)',
    example: 'Physics',
  })
  subjectName?: string;
}
