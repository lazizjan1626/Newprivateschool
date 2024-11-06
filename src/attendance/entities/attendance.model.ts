import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Class } from "../../classes/models/class.model";


interface IAttendanceCreationAttr{
    studentID: number;
    attendanceDate:Date;
    status:string;
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
        type: DataType.INTEGER,
        allowNull: false,
    })
    studentID: number;

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


    @HasMany(() => Class)
    class: Class[];

}
