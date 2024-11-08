import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Grade } from "../../grades/models/grade.model";


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
    

    @HasMany(() => Grade)  
    grades: Grade[];


}
