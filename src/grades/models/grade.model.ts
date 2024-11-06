import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IGradesCreationAttr{
    studentID: number;
    subjectID: number;
    grade: number;
    deteRecorded:Date;
    parentview:boolean

}


@Table({
    tableName: "grades",
    timestamps: true,
})
export class Grade extends Model<Grade,IGradesCreationAttr>{

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
        type: DataType.INTEGER,
        allowNull: false,
    })
    subjectID: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    grade: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    deteRecorded: Date;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    parentview: boolean;




}
