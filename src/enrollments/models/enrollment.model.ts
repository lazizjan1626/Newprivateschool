import { Column, DataType, Model, Table } from "sequelize-typescript";

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
        type: DataType.INTEGER,
        allowNull: false,
    })
    studentID: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    classID: number;

}
