import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { IsInt, IsDate, IsPositive, IsOptional } from 'class-validator';
import { CreateFeeDto } from './create-fee.dto';

export class UpdateFeeDto extends PartialType(CreateFeeDto) {
    @ApiProperty({
        description: 'The ID of the student for whom the fee is due (optional for update)',
        example: 1,
        required: false,
    })
    @IsInt()
    @IsOptional()
    studentID?: number;

    @ApiProperty({
        description: 'The amount of fee that is due (optional for update)',
        example: 1000.50,
        required: false,
    })
    @IsPositive()
    @IsOptional()  
    ammountDue?: number;

    @ApiProperty({
        description: 'The due date for the fee payment (optional for update)',
        example: '2024-12-01T00:00:00Z',
        required: false,
    })
    @IsDate()
    @IsOptional() 
    dueDate?: Date;

    @ApiProperty({
        description: 'The amount of fee that has been paid (optional for update)',
        example: 500,
        required: false,
    })
    @IsPositive()
    @IsOptional()  
    amountPaid?: number;

    @ApiProperty({
        description: 'The date when the payment was made (optional for update)',
        example: '2024-11-01T00:00:00Z',
        required: false,
    })
    @IsDate()
    @IsOptional() 
    paymentDate?: Date;
}
