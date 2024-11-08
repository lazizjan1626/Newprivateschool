import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ClassSchedule } from "../../class-schedule/models/class-schedule.modul";
import { Attendance } from "../../attendance/entities/attendance.model";
import { Student } from "../../sudent/models/sudent.model";
import { Enrollment } from "../../enrollments/models/enrollment.model";
import { Teacher } from "../../teachers/models/teacher.model";


interface IClassesCreationAttr{
    className: string;
    section: string;
    teacherID: number;
    classScheduleID: number;
    attendanceID:number;
}


@Table({
    tableName: 'classes',
    timestamps: true,
})
export class Class extends Model<Class,IClassesCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id:number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    className: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    section: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    teacherID: number;


    @ForeignKey(() => ClassSchedule)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    classScheduleID: number;

    @BelongsTo(() => ClassSchedule)
    classSchedule: ClassSchedule;




    @HasMany(() => Attendance)
    attendance: Attendance[];


    @HasMany(() => Student)
    students: Student[];

    @HasMany(() => Enrollment)
    enrollments: Enrollment[];

    @HasMany(() => Teacher)
    treachers: Teacher[];


}
