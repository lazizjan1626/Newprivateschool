import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateFeeDto {
    @ApiProperty({
        description: 'The ID of the student for whom the fee is due',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    studentID: number;

    @ApiProperty({
        description: 'The amount of fee that is due',
        example: 1000.50,
    })
    @IsPositive()
    @IsNotEmpty()
    ammountDue: number;

    @ApiProperty({
        description: 'The due date for the fee payment',
        example: '2024-12-01T00:00:00Z',
    })
    @IsDate()
    @IsNotEmpty()
    dueDate: Date;

    @ApiProperty({
        description: 'The amount of fee that has been paid',
        example: 500,
    })
    @IsPositive()
    @IsNotEmpty()
    amountPaid: number;

    @ApiProperty({
        description: 'The date when the payment was made',
        example: '2024-11-01T00:00:00Z',
    })
    @IsDate()
    @IsNotEmpty()
    paymentDate: Date;
}
