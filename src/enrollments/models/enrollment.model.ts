import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "../../sudent/models/sudent.model";
import { Class } from "../../classes/models/class.model";

interface IEnrollmentsCreationAttr{
    studentID: number;
    classID: number;
    enrollmentDate: Date;
}





@Table({
    tableName: 'enrollments',
    timestamps: false,
})
export class Enrollment extends Model<Enrollment,IEnrollmentsCreationAttr>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    enrollmentDate: Date;


    @ForeignKey(() => Student)
    @Column
    studentID: number;


    @ForeignKey(() => Class)
    @Column
    classID: number;



}
