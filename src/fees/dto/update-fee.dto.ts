import { PartialType } from '@nestjs/swagger';
import { CreateFeeDto } from './create-fee.dto';

export class UpdateFeeDto extends PartialType(CreateFeeDto) {
    studentID?:number;
    ammountDue?:number;
    dueDate?:Date;
    amountPaid?:number;
    paymentDate?:Date;
}
