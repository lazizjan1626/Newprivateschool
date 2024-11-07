import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IAdminCreationAttr{
    name: string;
    email: string;
    hashed_password: string;
    is_active: boolean; 
    is_creator: boolean;

}








@Table({
    tableName: 'admins',
    timestamps: true,
})
export class Admin extends Model<Admin,IAdminCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_creator: boolean;

    

}
