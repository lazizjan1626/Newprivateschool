import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "../../sudent/models/sudent.model";
import { Subjects } from "../../subject/models/subject.model";

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

    @ForeignKey(() => Student)
    @Column
    studentID: number;

    @ForeignKey(() => Subjects)
    @Column
    subjectID: number;


}
