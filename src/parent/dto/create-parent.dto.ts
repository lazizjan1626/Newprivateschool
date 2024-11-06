import { Gender } from "../../other/types";

export class CreateParentDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
    gender: Gender
    address: string;
    relationship:string;
    is_active: boolean;
}
