import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IFeeCreationAttr{
    studentID:number;
    ammountDue:number;
    dueDate:Date;
    amountPaid:number;
    paymentDate:Date;
}

@Table({
    tableName: "fees",
    timestamps: true,

})
export class Fee extends Model<Fee,IFeeCreationAttr>{
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
        type: DataType.FLOAT,
        allowNull: false,
    })
    ammountDue: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    dueDate: Date;


    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amountPaid: number;


    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    paymentDate: Date;

}
