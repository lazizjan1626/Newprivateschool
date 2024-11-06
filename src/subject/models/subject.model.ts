import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ISubjectCreationAttr{
    subjectName: string;
}



@Table({
    tableName:'subjects',
    timestamps: true,
})
export class Subjects extends Model<Subjects,ISubjectCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    subjectName: string;

}
