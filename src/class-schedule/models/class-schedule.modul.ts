import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ClassScheduleEnum } from "./ClassScheduleEnum";
import { Class } from "../../classes/models/class.model";
interface IClassScheduleCreationAttr {
    classID: number;
    dayofweek: string;
    startTime: string; 
    endTime: string;
}

@Table({
    tableName: 'class_schedules',
    timestamps: true,
})
export class ClassSchedule extends Model<ClassSchedule, IClassScheduleCreationAttr> {
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
    classID: number;

    @Column({
        type: DataType.ENUM(...ClassScheduleEnum.DAYS), 
        allowNull: false,
    })
    dayofweek: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    startTime: string; 

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endTime: string;

    @HasMany(() => Class)
    class: Class[];
}
