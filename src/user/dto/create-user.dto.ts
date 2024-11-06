export class CreateUserDto {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    roleID: number;
    is_creator: boolean;
}
