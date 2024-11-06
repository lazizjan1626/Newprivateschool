import { Column, DataType, Table,Model } from "sequelize-typescript";
import { Gender } from "../../other/types";

interface IParentCreationAttr{
    first_name: string;
    last_name: string;
    email: string;
    hashed_password: string;
    age: number;
    gender: Gender
    address: string;
    relationship:string;
    is_active: boolean;
}

@Table({
    tableName: 'parents',
    timestamps: true,
    underscored: true,
})
export class Parent extends Model<Parent,IParentCreationAttr> {
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
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

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
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 99,
        },
    })
    age: number;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
        allowNull: false,
    })
    gender: Gender;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    relationship: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    is_active: boolean;

}
