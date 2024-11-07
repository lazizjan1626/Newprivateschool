import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "../../sudent/models/sudent.model";
import { Parent } from "./parent.model";

interface IStudentParentCreationAttr{
    studentID:number;
    parentID:number;
}

@Table({
    tableName: 'student_parents'
})
export class StudentParents extends Model<StudentParents,IStudentParentCreationAttr>{

    @ForeignKey(() => Student)
    @Column
    studentID:number;

    @ForeignKey(() => Parent)
    @Column
    parentID: number;



}