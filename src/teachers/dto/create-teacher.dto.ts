export class CreateTeacherDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    subjectID: number;
    hireDate:Date;
    address: string;
    is_active: boolean;
    roleID:number
    classID:number
}
