import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Gender } from "../../other/types";
import { Parent } from "../../parent/models/parent.model";
import { StudentParents } from "../../parent/models/studentparents.model";

interface IStudentCreationAttr{
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: Gender;
    adress: string;
    phone_number: string;
    email:string;
    hashed_password:string;
    enrollmentDete: string;
    is_active: boolean;
    classID: number;
}



@Table({
    tableName: "students",
    timestamps: true,
    paranoid: true,
})
export class Student extends Model<Student,IStudentCreationAttr>{
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
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birthDate: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
        allowNull: false,
    })
    gender: Gender;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    adress: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;

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
    hashed_password: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        defaultValue: Date.now
    })
    enrollmentDete: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    is_active: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    classID: number;

    @BelongsToMany(() => Parent, () => StudentParents)
    parents: Parent[];
}
