import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ITeacherCreationAttr{
    firstName: string;
    lastName: string;
    email: string;
    hashedpassword: string;
    phone: string;
    subjectID: number;
    hireDate:Date;
    address: string;
    is_active: boolean;
    roleID:number
    refreshToken:string;
    
}



@Table({
    tableName: 'teachers',
    timestamps: true,
    underscored: true,
})
export class Teacher extends Model<Teacher,ITeacherCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashedpassword: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    subjectID: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    hireDate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_active: boolean;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleID: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    refreshToken: string;
}
