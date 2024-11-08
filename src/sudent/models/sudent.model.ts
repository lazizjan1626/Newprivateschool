import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Gender } from "../../other/types";
import { Parent } from "../../parent/models/parent.model";
import { StudentParents } from "../../parent/models/studentparents.model";
import { Fee } from "../../fees/models/fee.model";
import { Grade } from "../../grades/models/grade.model";
import { Enrollment } from "../../enrollments/models/enrollment.model";
import { Attendance } from "../../attendance/entities/attendance.model";
import { Class } from "../../classes/models/class.model";

interface IStudentCreationAttr{
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: Gender;
    adress: string;
    phone_number: string;
    email:string;
    hashed_password:string;
    enrollmentDete: string;
    is_active: boolean;
    classID: number;
}



@Table({
    tableName: "students",
    timestamps: true,
    paranoid: true,
})
export class Student extends Model<Student,IStudentCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;


    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birthDate: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
        allowNull: false,
    })
    gender: Gender;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    adress: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        defaultValue: Date.now
    })
    enrollmentDete: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    is_active: boolean;

    @BelongsToMany(() => Parent, () => StudentParents)
    parents: Parent[];

    @HasMany(() => Fee)
    Fee: Fee[];

    @HasMany(() => Grade)
    Grade: Grade[];

    @HasMany(() => Enrollment)
    Enrollment: Enrollment[];

    @HasMany(() => Attendance)
    Attendance: Attendance[];

    @ForeignKey(() => Class)
    @Column
    classID: number;
}
