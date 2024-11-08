import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Class } from "../../classes/models/class.model";
import { Student } from "../../sudent/models/sudent.model";


interface IAttendanceCreationAttr{
    studentID: number;
    attendanceDate:Date;
    status:string;
    classID:number;
    parentview:boolean;
}


@Table({
    tableName: 'attendances',
    timestamps: true,
})
export class Attendance extends Model<Attendance,IAttendanceCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    attendanceDate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;


    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    parentview: boolean;


    @ForeignKey(() => Student)
    @Column
    studentID: number;
    

    @ForeignKey(() => Class)
    @Column
    classID: number;

}
